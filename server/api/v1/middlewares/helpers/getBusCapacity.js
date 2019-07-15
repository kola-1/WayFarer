import db from '../../models/dbConnect';
import errors from '../errors/errorHandler';

const getBusCapacity = (req, res, next) => {
    const { bus_id } = req.tripInfo;

    const queryString = 'SELECT capacity FROM buses WHERE id= $1;';

    db.query(queryString, [bus_id], (err, data) => {
        if (err) {
            return errors.serverError(res);
        }
        const busInfo = {
            capacity: data.rows[0].capacity
        };

        req.busInfo = busInfo;

        next();
    });
};

export default getBusCapacity;
