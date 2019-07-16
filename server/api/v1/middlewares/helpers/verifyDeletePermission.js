import db from '../../models/dbConnect';
import errors from '../errors/errorHandler';

const verifyDeletePermission = (req, res, next) => {
    const { user_id } = req.userInfo;

    const { params } = req;

    const queryString = 'SELECT trip_id, user_id FROM bookings WHERE trip_id= $1 AND user_id= $2;';

    db.query(queryString, [params.id, user_id], (err, data) => {
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
