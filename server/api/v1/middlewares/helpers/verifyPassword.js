import bcrypt from 'bcryptjs';
import errors from '../errors/errorHandler';


const verifyPassword = (req, res, next) => {
    const { password } = req.body;

    const samePassword = bcrypt.compareSync(password.trim(), req.hashedPassword);

    if (!samePassword) {
        return errors.badRequestError(res, 'invalid email or password');
    }
    next();
};

export default verifyPassword;
