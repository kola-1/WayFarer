import Schema from './validationSchema';
import Validator from './validator';

const { tripSchema } = Schema;
const { validateRequest } = Validator;

const validateTrip = (req, res, next) => validateRequest(req, res, next, ['bus_id', 'origin', 'destination', 'trip_date', 'fare'], tripSchema);
const validateTripId = (req, res, next) => validateRequest(req, res, next, ['trip_id'], tripSchema);

export default { validateTrip, validateTripId };
