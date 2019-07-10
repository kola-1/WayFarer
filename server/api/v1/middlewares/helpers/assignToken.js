import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const signToken = (data, expiredTime) => {
    const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: expiredTime });
    return token;
};

const assignToken = (req, res, next) => {
    // get user data from req object
    const {
        first_name, last_name, email, password
    } = req.body;

    // assign the signed token
    const token = signToken({
        first_name, last_name, email, password
    }, '5h');

    // add token to request body
    req.token = token;

    next();
};

export default assignToken;
