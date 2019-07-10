import db from '../../models/dbConnect';
import errors from '../errors/errorHandler';

const checkUserExist = (req, res, next) => {
    const { email } = req.body;

    const text = 'SELECT EXISTS(SELECT id FROM users WHERE email= $1);';

    db.query(text, [email], (err, data) => {
        if (err) {
            return errors.serverError(res);
        }
        if (data.rows[0].exists) {
            return errors.conflictError(res, 'The provided email already exist');
        }
        next();
    });
};

export default checkUserExist;
