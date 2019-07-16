import db from '../models/dbConnect';
import errors from '../middlewares/errors/errorHandler';


class BusController {
    /**
    * Add a bus
    *@param {object} req The request *.
    *@param {object} res The response *.
    *@returns {object} returns response *
    */
    static addBus(req, res) {
        const {
            number_plate, manufacturer, model, year, capacity
        } = req.body;

        const queryString = 'INSERT INTO buses(number_plate, manufacturer, model, year, capacity) values($1, $2, $3, $4, $5) RETURNING id';
        const queryValues = [number_plate, manufacturer, model, year, capacity];
        db.query(queryString, queryValues, (err, data) => {
            if (err) {
                return errors.serverError(res);
            }

            return res.status(201).json({
                status: 'success',
                data: {
                    message: 'Bus added successfully',
                    id: data.rows[0].id,
                }
            });
        });
    }
}

export default BusController;
