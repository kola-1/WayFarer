import express from 'express';
import verifyRequestToken from '../middlewares/helpers/verifyRequestToken';
import validateUser from '../middlewares/validations/validateUsers';
import validateTrips from '../middlewares/validations/validateTrips';
import verifyTrip from '../middlewares/helpers/verifyTrip';
import fetchUserInfo from '../middlewares/helpers/fetchUserInfo';
import checkDuplicateBooking from '../middlewares/helpers/checkDuplicateBooking';
import getBusCapacity from '../middlewares/helpers/getBusCapacity';
import checkBookingAvailability from '../middlewares/helpers/checkBookingAvailability';
import assignSeat from '../middlewares/helpers/assignSeat';
import BookingController from '../controllers/BookingController';


const router = express.Router();

const { validateTripId } = validateTrips;

// Book a seat on a trip
const bookATrip = [
    verifyRequestToken,
    validateUser,
    validateTripId,
    verifyTrip,
    fetchUserInfo,
    checkDuplicateBooking,
    getBusCapacity,
    checkBookingAvailability,
    assignSeat,
    BookingController.bookTrip
];
router.post('/', bookATrip);


export default router;
