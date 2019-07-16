import db from '../models/dbConnect';
import errors from '../middlewares/errors/errorHandler';


class BookingController {
    /**
    * Book a trip
    *@param {object} req The request *.
    *@param {object} res The response *.
    *@returns {object} returns response *
    */
    static bookTrip(req, res) {
        const { email } = req.userTokenInfo;
        const { trip_id } = req.body;
        const { user_id, first_name, last_name } = req.userInfo;
        const { seat_number } = req;
        const { bus_id, trip_date } = req.tripInfo;


        const queryString = 'INSERT INTO bookings(trip_id, user_id, seat_number) values($1, $2, $3) RETURNING *';
        const queryValues = [trip_id, user_id, seat_number];
        db.query(queryString, queryValues, (err, bookingData) => {
            if (err) {
                return errors.serverError(res);
            }

            return res.status(201).json({
                status: 'success',
                data: {
                    id: bookingData.rows[0].id,
                    user_id: bookingData.rows[0].user_id,
                    trip_id: bookingData.rows[0].trip_id,
                    bus_id,
                    trip_date,
                    seat_number: bookingData.rows[0].id,
                    first_name,
                    last_name,
                    email
                }
            });
        });
    }


    /**
  * View all bookings
  *@param {object} req The request *.
  *@param {object} res The response *.
  *@returns {object} returns response *
  */
    static fetchBookings(req, res) {
        const { role } = req;
        const { user_id } = req.userInfo;

        let queryString;
        let queryValue;

        if (role === 'admin') {
            queryString = 'SELECT bookings.id, user_id,  trip_id, bus_id, trip_date, seat_number, first_name, last_name, email FROM trips INNER JOIN bookings ON (bookings.trip_id = trips.id) INNER JOIN users ON (bookings.user_id = users.id)';

            db.query(queryString, (err, data) => {
                if (err) {
                    return errors.serverError(res);
                }
                return res.status(200).json({
                    status: 'success',
                    data: data.rows
                });
            });
        } else {
            queryString = 'SELECT bookings.id, user_id,  trip_id, bus_id, trip_date, seat_number, first_name, last_name, email FROM trips INNER JOIN bookings ON (bookings.trip_id = trips.id) INNER JOIN users ON (bookings.user_id = users.id) WHERE user_id = $1';
            queryValue = [user_id];
            db.query(queryString, queryValue, (err, data) => {
                if (err) {
                    return errors.serverError(res);
                }
                return res.status(200).json({
                    status: 'success',
                    data: data.rows
                });
            });
        }
    }


    /**
  * Delete a booking
  *@param {object} req The request *.
  *@param {object} res The response *.
  *@returns {object} returns response *
  */
    static delete(req, res) {
        const { params } = req;

        const queryString = 'DELETE FROM bookings WHERE id = $1';
        const queryValue = [params.id];

        db.query(queryString, queryValue, (err) => {
            if (err) {
                return errors.serverError(res);
            }
            return res.status(200).json({
                status: 'success',
                data: {
                    message: 'Booking deleted successfully'
                }
            });
        });
    }
}

export default BookingController;
