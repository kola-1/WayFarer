import db from '../../models/dbConnect';
import errors from '../errors/errorHandler';

const verifyTrip = (req, res, next) => {
    const { trip_id } = req.body;

    const queryString = 'SELECT id, bus_id, trip_date, status FROM trips WHERE id= $1;';

    db.query(queryString, [trip_id], (err, data) => {
        if (err) {
            return errors.serverError(res);
        }
        if (data.rows[0] === undefined) {
            return errors.notFoundError(res, 'the specified trip does not exist');
        }
        const tripInfo = {
            trip_id: data.rows[0].id,
            bus_id: data.rows[0].bus_id,
            trip_date: data.rows[0].trip_date,
            status: data.rows[0].status
        };
        if (tripInfo.status !== 'active') {
            return errors.forbiddenError(res, 'the specified trip is not available');
        }
        req.tripInfo = tripInfo;

        next();
    });
};

export default verifyTrip;
