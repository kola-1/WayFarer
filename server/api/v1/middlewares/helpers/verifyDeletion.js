import db from '../../models/dbConnect';
import errors from '../errors/errorHandler';

const verifyDeletion = (req, res, next) => {
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
        next();
    });
};

export default verifyDeletion;
