import express from 'express';
import verifyRequestToken from '../middlewares/helpers/verifyRequestToken';
import confirmRole from '../middlewares/helpers/confirmRole';
import validateBus from '../middlewares/validations/validateBus';
import BusController from '../controllers/BusController';


const router = express.Router();


// Add a bus
const addBus = [
    verifyRequestToken,
    confirmRole.admin,
    validateBus,
    BusController.addBus
];
router.post('/', addBus);


export default router;
