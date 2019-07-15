import db from '../../models/dbConnect';
import errors from '../errors/errorHandler';

const confirmTripExist = (req, res, next) => {
    const { params } = req;

    const queryString = 'SELECT status FROM trips WHERE id = $1;';

    db.query(queryString, [params.id], (err, data) => {
        if (err) {
            return errors.serverError(res);
        }

        if (data.rows[0] === undefined) {
            return errors.notFoundError(res, 'The specified trip does not exist');
        }

        if (data.rows[0].status === 'cancelled') {
            return errors.conflictError(res, 'The specified trip has already been cancelled');
        }
        next();
    });
};

export default confirmTripExist;
