import debug from 'debug';
import db from '../models/dbConnect';
import errors from '../middlewares/errors/errorHandler';


const errorLog = debug('query:error');

class TripController {
    /**
    * Create a trip
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
                    id: rows[0].id,
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


    /**
  * View all trips
  *@param {object} req The request *.
  *@param {object} res The response *.
  *@returns {object} returns response *
  */
    static viewTrips(req, res) {
        const { origin, destination } = req.query;

        let queryString;

        if (origin === undefined && destination === undefined) {
            queryString = 'SELECT id, bus_id, origin, destination, trip_date, fare, status FROM trips';
        } else if (origin === undefined) {
            queryString = `SELECT id, bus_id, origin, destination, trip_date, fare, status FROM trips WHERE destination = '${destination}'`;
        } else {
            queryString = `SELECT id, bus_id, origin, destination, trip_date, fare, status FROM trips WHERE origin = '${origin}'`;
        }
        db.query(queryString, (err, data) => {
            if (err) {
                return errors.serverError(res);
            }
            if (data.rows[0] === undefined) {
                return errors.notFoundError(res, 'No trips found');
            }
            return res.status(200).json({
                status: 'success',
                data: data.rows
            });
        });
    }


    /**
  * Cancel a trip
  *@param {object} req The request *.
  *@param {object} res The response *.
  *@returns {object} returns response *
  */
    static cancelTrip(req, res) {
        const { params } = req;

        const queryString = 'UPDATE trips SET status = $1 WHERE id = $2';
        const queryValue = ['cancelled', params.id];

        db.query(queryString, queryValue, (err) => {
            if (err) {
                return errors.serverError(res);
            }
            return res.status(200).json({
                status: 'success',
                data: {
                    message: 'Trip cancelled successfully'
                }
            });
        });
    }
}

export default TripController;
