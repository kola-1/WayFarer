import db from '../../models/dbConnect';
import errors from '../errors/errorHandler';

const assignSeat = (req, res, next) => {
    const { trip_id } = req.tripInfo;
    const { seat_number } = req.body;
    const { capacity } = req.busInfo;

    if (seat_number) {
        const queryString = 'SELECT EXISTS(SELECT id FROM bookings WHERE trip_id= $1 AND seat_number = $2);';

        db.query(queryString, [trip_id, seat_number], (err, data) => {
            if (err) {
                return errors.serverError(res);
            }

            if (data.rows[0].exists) {
                return errors.conflictError(res, 'The requested seat has been booked');
            }

            req.seat_number = req.body.seat_number;
            next();
        });
    }

    if (!seat_number) {
        const queryString = 'SELECT seat_number FROM bookings WHERE trip_id = $1;';

        db.query(queryString, [trip_id], (err, data) => {
            if (err) {
                return errors.serverError(res);
            }

            if (data.rows[0] === undefined) {
                req.seat_number = 1;
            } else {
                let i = 1;
                const takenSeats = seats => seats.seat_number === i;
                while (i <= capacity) {
                    i += 1;

                    if (!(data.rows.find(takenSeats))) {
                        req.seat_number = i;
                        break;
                    }
                }
            }

            next();
        });
    }
};

export default assignSeat;
