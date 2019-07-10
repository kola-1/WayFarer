import bcrypt from 'bcryptjs';

const encryptPassword = (req, res, next) => {
    const { password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    req.hashedPassword = hashedPassword;

    next();
};

export default encryptPassword;
