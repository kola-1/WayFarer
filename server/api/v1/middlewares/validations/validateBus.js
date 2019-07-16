import Schema from './validationSchema';
import Validator from './validator';

const { busSchema } = Schema;
const { validateRequest } = Validator;

const validateBus = (req, res, next) => validateRequest(req, res, next, ['number_plate', 'manufacturer', 'model', 'year', 'capacity'], busSchema);

export default validateBus;
