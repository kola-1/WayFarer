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

        const queryString = 'INSERT INTO buses(number_plate, manufacturer, model, year, capacity) values($1, $2, $3, $4, $5) RETURNING *';
        const queryValues = [number_plate, manufacturer, model, year, capacity];
        db.query(queryString, queryValues, (err, data) => {
            if (err) {
                return errors.serverError(res);
            }

            return res.status(201).json({
                status: 'success',
                data: {
                    id: data.rows[0].id,
                    number_plate: data.rows[0].number_plate,
                    manufacturer: data.rows[0].manufacturer,
                    model: data.rows[0].model,
                    year: data.rows[0].year,
                    capacity: data.rows[0].capacity,
                    available: data.rows[0].available
                }
            });
        });
    }
}

export default BusController;
