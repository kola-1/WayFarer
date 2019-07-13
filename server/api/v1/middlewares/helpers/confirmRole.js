import errors from '../errors/errorHandler';

const confirmRole = (req, res, next, roleValue) => {
    const { is_admin } = req.userTokenInfo;

    if (!(is_admin === roleValue)) {
        return errors.unauthorizedError(res);
    }

    next();
};

const admin = (req, res, next) => {
    confirmRole(req, res, next, true);
};


const user = (req, res, next) => {
    confirmRole(req, res, next, false);
};

export default { admin, user };
