import db from '../../models/dbConnect';
import errors from '../errors/errorHandler';

const verifyDeletePermission = (req, res, next) => {
    const { user_id } = req.userInfo;

    const { params } = req;

    const queryString = 'SELECT user_id FROM bookings WHERE id= $1;';

    db.query(queryString, [params.id], (err, data) => {
        if (err) {
            return errors.serverError(res);
        }
        if (data.rows[0] === undefined) {
            return errors.notFoundError(res, 'The specified booking you are trying to delete does not exist');
        }
        if (data.rows[0].user_id !== user_id) {
            return errors.forbiddenError(res, 'You are not allowed to perform this action');
        }

        next();
    });
};

export default verifyDeletePermission;
