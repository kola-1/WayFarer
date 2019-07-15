import errors from '../errors/errorHandler';

const getRoleType = (req, res, next) => {
    const { is_admin } = req.userTokenInfo;

    if ((is_admin !== false) && (is_admin !== true)) {
        return errors.unauthorizedError(res);
    }

    if (is_admin === false) {
        req.role = 'user';
        next();
    }

    if (is_admin === true) {
        req.role = 'admin';
        next();
    }
};


export default getRoleType;
