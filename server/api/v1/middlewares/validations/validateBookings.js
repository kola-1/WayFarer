import Schema from './validationSchema';
import Validator from './validator';

const { bookingSchema } = Schema;
const { validateRequest } = Validator;

const validateBooking = (req, res, next) => validateRequest(req, res, next, ['seat_number'], bookingSchema);

export default validateBooking;
