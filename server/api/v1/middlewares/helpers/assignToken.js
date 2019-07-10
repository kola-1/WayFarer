import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const signToken = (data, expiredTime) => {
    const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: expiredTime });
    return token;
};

const assignToken = (req, res, next) => {
    const { email } = req.body;
    const { hashedPassword } = req.hashedPassword;

    // assign the signed token
    const token = signToken({
        email, hashedPassword
    }, '5h');

    // add token to request body
    req.token = token;

    next();
};

export default assignToken;
