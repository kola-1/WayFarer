import db from '../../models/dbConnect';
import errors from '../errors/errorHandler';

const checkUserBookingExist = (req, res, next) => {
    const { user_id } = req.userInfo;
    const { role } = req;

    if (role === 'user') {
        const queryString = 'SELECT EXISTS(SELECT id FROM bookings WHERE user_id = $1);';

        db.query(queryString, [user_id], (err, data) => {
            if (err) {
                return errors.serverError(res);
            }
            if (!(data.rows[0].exists)) {
                return errors.notFoundError(res, 'You do not have any bookings');
            }
        });
    }

    next();
};

export default checkUserBookingExist;
