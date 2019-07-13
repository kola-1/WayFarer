import debug from 'debug';
import db from '../models/dbConnect';
import errors from '../middlewares/errors/errorHandler';


const errorLog = debug('query:error');

class TripController {
    /**
    * Signup a user
    *@param {object} req The request *.
    *@param {object} res The response *.
    *@returns {object} returns response *
    */
    static createTrip(req, res) {
        const {
            bus_id, origin, destination, trip_date, fare
        } = req.body;

        let queryString;
        let queryValues;

        if (trip_date) {
            queryString = 'INSERT INTO trips(bus_id, origin, destination, trip_date, fare) values($1, $2, $3, $4, $5) RETURNING *';
            queryValues = [bus_id, origin, destination, trip_date, fare];
        } else {
            queryString = 'INSERT INTO trips(bus_id, origin, destination, fare) values($1, $2, $3, $4) RETURNING *';
            queryValues = [bus_id, origin, destination, fare];
        }

        (async () => {
            const client = await db.connect();


            try {
                await client.query('BEGIN');
                const { rows } = await client.query(queryString, queryValues);
                const data = {
                    trip_id: rows[0].id,
                    bus_id: rows[0].bus_id,
                    origin: rows[0].origin,
                    destination: rows[0].destination,
                    trip_date: rows[0].trip_date,
                    fare: rows[0].fare
                };

                queryString = `UPDATE buses SET available = false WHERE id = '${bus_id}';`;

                await client.query(queryString);
                await client.query('COMMIT');
                return res.status(201).json({
                    status: 'success',
                    data
                });
            } catch (error) {
                await client.query('ROLLBACK');
                errorLog('An error occured while querying the database', error.stack);
                return errors.serverError(res);
            } finally {
                client.release();
            }
        })();
    }
}

export default TripController;
