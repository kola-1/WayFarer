import express from 'express';
import verifyRequestToken from '../middlewares/helpers/verifyRequestToken';
import confirmRole from '../middlewares/helpers/confirmRole';
import validateUser from '../middlewares/validations/validateUsers';
import validateTrip from '../middlewares/validations/validateTrips';
import confirmAvailableBus from '../middlewares/helpers/confirmAvailableBus';
import TripController from '../controllers/TripController';


const router = express.Router();


// Create a trip
const createTrip = [
    verifyRequestToken,
    confirmRole.admin,
    validateUser,
    validateTrip,
    confirmAvailableBus,
    TripController.createTrip
];
router.post('/', createTrip);


export default router;
