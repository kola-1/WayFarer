import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import errors from '../errors/errorHandler';

dotenv.config();


const confirmToken = (req, res, next, token) => {
    // Secret key
    const secret = process.env.SECRET_KEY;

    jwt.verify(token, secret, (err, tokenData) => {
        if (err) {
            // Wrong token
            return errors.forbiddenError(res, 'You do not have permission to access this resource');
        }
        req.userTokenInfo = tokenData;
        next();
    });
};


const verifyHeaderToken = (req, res, next, accessToken) => {
    // Extract token from request header value
    const [, headerToken] = accessToken.split(' ');

    confirmToken(req, res, next, headerToken);
};


const verifyBodyToken = (req, res, next, accessToken) => {
    const bodyToken = accessToken;

    confirmToken(req, res, next, bodyToken);
};


const verifyRequestToken = (req, res, next) => {
    const bearerHeaderToken = req.headers.authorization;
    const bodyToken = req.body.token;

    const accessToken = bearerHeaderToken || bodyToken;

    // Check if token exist in either request header or request body
    if (!accessToken) return errors.unauthorizedError(res);

    if (bearerHeaderToken === undefined) {
        verifyBodyToken(req, res, next, bodyToken);
    } else {
        verifyHeaderToken(req, res, next, bearerHeaderToken);
    }
};


export default verifyRequestToken;
