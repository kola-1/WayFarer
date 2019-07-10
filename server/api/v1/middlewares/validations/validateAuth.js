import Schema from './validationSchema';
import Validator from './validator';

const { authSchema } = Schema;
const { validateRequest } = Validator;

const validateSignup = (req, res, next) => validateRequest(req, res, next, ['first_name', 'last_name', 'email', 'password'], authSchema);

export default { validateSignup };
