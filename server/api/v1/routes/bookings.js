import express from 'express';
import verifyRequestToken from '../middlewares/helpers/verifyRequestToken';
import validateUser from '../middlewares/validations/validateUsers';
import validateTrips from '../middlewares/validations/validateTrips';
import validateBookings from '../middlewares/validations/validateBookings';
import verifyTrip from '../middlewares/helpers/verifyTrip';
import fetchUserInfo from '../middlewares/helpers/fetchUserInfo';
import checkDuplicateBooking from '../middlewares/helpers/checkDuplicateBooking';
import getBusCapacity from '../middlewares/helpers/getBusCapacity';
import checkBookingAvailability from '../middlewares/helpers/checkBookingAvailability';
import assignSeat from '../middlewares/helpers/assignSeat';
import getRoleType from '../middlewares/helpers/getRoleType';
import checkUserBookingExist from '../middlewares/helpers/checkUserBookingExist';
import verifyDeletePermission from '../middlewares/helpers/verifyDeletePermission';
import BookingController from '../controllers/BookingController';


const router = express.Router();

const { validateTripId } = validateTrips;

// Book a seat on a trip
const bookATrip = [
    verifyRequestToken,
    validateUser,
    validateTripId,
    validateBookings,
    verifyTrip,
    fetchUserInfo,
    checkDuplicateBooking,
    getBusCapacity,
    checkBookingAvailability,
    assignSeat,
    BookingController.bookTrip
];
router.post('/', bookATrip);

// View bookings
const viewBookings = [
    verifyRequestToken,
    validateUser,
    getRoleType,
    fetchUserInfo,
    checkUserBookingExist,
    BookingController.fetchBookings
];
router.get('/', viewBookings);

// Delete booking
const deleteBooking = [
    verifyRequestToken,
    validateUser,
    fetchUserInfo,
    verifyDeletePermission,
    BookingController.delete
];
router.delete('/:id', deleteBooking);

export default router;
