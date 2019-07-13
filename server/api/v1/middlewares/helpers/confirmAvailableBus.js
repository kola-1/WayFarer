import db from '../../models/dbConnect';
import errors from '../errors/errorHandler';

const confirmAvailableBus = (req, res, next) => {
    const { bus_id } = req.body;

    const queryString = 'SELECT available FROM buses WHERE id= $1;';

    db.query(queryString, [bus_id], (err, data) => {
        if (err) {
            return errors.serverError(res);
        }
        if (data.rows[0] === undefined) {
            return errors.notFoundError(res, 'The specified bus does not exist');
        }
        const busInfo = {
            available: data.rows[0].available
        };

        if (busInfo.available === false) {
            return errors.conflictError(res, 'The specified bus is already booked for a trip');
        }

        next();
    });
};

export default confirmAvailableBus;
