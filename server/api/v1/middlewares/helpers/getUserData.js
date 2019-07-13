import db from '../../models/dbConnect';
import errors from '../errors/errorHandler';

const getUserData = (req, res, next) => {
    const { email } = req.body;

    const queryString = 'SELECT id, password, is_admin FROM users WHERE email= $1;';

    db.query(queryString, [email], (err, data) => {
        if (err) {
            return errors.serverError(res);
        }
        if (data.rows[0] === undefined) {
            return errors.notFoundError(res, 'invalid email or password');
        }
        const userInfo = {
            user_id: data.rows[0].id,
            is_admin: data.rows[0].is_admin,
            password: data.rows[0].password
        };

        req.userInfo = userInfo;

        next();
    });
};

export default getUserData;
