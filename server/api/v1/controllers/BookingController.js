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
                    booking_id: bookingData.rows[0].id,
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
}

export default BookingController;
