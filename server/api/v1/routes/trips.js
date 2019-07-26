import express from 'express';
import verifyRequestToken from '../middlewares/helpers/verifyRequestToken';
import confirmRole from '../middlewares/helpers/confirmRole';
import validateTrips from '../middlewares/validations/validateTrips';
import confirmAvailableBus from '../middlewares/helpers/confirmAvailableBus';
import confirmTripExist from '../middlewares/helpers/confirmTripExist';
import TripController from '../controllers/TripController';


const router = express.Router();

const { validateTrip } = validateTrips;

// Create a trip
const createTrip = [
    verifyRequestToken,
    confirmRole.admin,
    validateTrip,
    confirmAvailableBus,
    TripController.createTrip
];
router.post('/', createTrip);


// View all trip
const viewTrips = [
    verifyRequestToken,
    TripController.viewTrips
];
router.get('/', viewTrips);


// Cancel a trip
const cancelTrips = [
    verifyRequestToken,
    confirmRole.admin,
    confirmTripExist,
    TripController.cancelTrip
];
router.patch('/:id', cancelTrips);


export default router;
