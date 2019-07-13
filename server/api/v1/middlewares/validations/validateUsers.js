import Schema from './validationSchema';
import Validator from './validator';


const { userSchema } = Schema;
const { validateRequest } = Validator;

const validateUser = (req, res, next) => validateRequest(req, res, next, ['user_id', 'is_admin'], userSchema);

export default validateUser;
