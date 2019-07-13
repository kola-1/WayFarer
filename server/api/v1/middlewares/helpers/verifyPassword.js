import bcrypt from 'bcryptjs';
import errors from '../errors/errorHandler';


const verifyPassword = (req, res, next) => {
    const { password } = req.body;
    const { userInfo } = req;

    const samePassword = bcrypt.compareSync(password.trim(), userInfo.password);

    if (!samePassword) {
        return errors.badRequestError(res, 'invalid email or password');
    }
    next();
};

export default verifyPassword;
