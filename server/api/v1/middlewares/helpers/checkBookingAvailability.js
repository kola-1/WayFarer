import db from '../../models/dbConnect';
import errors from '../errors/errorHandler';

const checkBookingAvailability = (req, res, next) => {
    const { capacity } = req.busInfo;
    const { trip_id } = req.tripInfo;

    const queryString = 'SELECT count(*) FROM bookings WHERE trip_id = $1;';

    db.query(queryString, [trip_id], (err, data) => {
        if (err) {
            return errors.serverError(res);
        }

        if (data.rows[0].count.toString() === capacity.toString()) {
            return errors.forbiddenError(res, 'Sorry, this trip has been fully booked');
        }

        next();
    });
};

export default checkBookingAvailability;
