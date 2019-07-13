import bcrypt from 'bcryptjs';

const encryptPassword = (req, res, next) => {
    const { password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const userInfo = { userPassword: hashedPassword };

    req.userInfo = userInfo;

    next();
};

export default encryptPassword;
