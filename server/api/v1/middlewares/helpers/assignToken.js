import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const signToken = (data, expiredTime) => {
    const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: expiredTime });
    return token;
};

const assignToken = (req, res, next) => {
    const { email } = req.body;
    let { is_admin } = req.userInfo;

    if (is_admin === undefined) {
        is_admin = false;
    }

    // assign the signed token
    const token = signToken({
        is_admin, email
    }, '10h');

    // add token to request body
    req.token = token;

    next();
};

export default assignToken;
