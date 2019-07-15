import db from '../../models/dbConnect';
import errors from '../errors/errorHandler';

const checkDuplicateBooking = (req, res, next) => {
    const { user_id } = req.userInfo;
    const { trip_id } = req.body;

    const queryString = 'SELECT EXISTS(SELECT id FROM bookings WHERE user_id= $1 AND trip_id = $2);';

    db.query(queryString, [user_id, trip_id], (err, data) => {
        if (err) {
            return errors.serverError(res);
        }
        if (data.rows[0].exists) {
            return errors.conflictError(res, 'You have already booked a seat for this trip');
        }
        next();
    });
};

export default checkDuplicateBooking;
