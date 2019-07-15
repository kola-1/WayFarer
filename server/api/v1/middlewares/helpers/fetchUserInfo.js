import db from '../../models/dbConnect';
import errors from '../errors/errorHandler';

const fetchUserId = (req, res, next) => {
    const { email } = req.userTokenInfo;

    const queryString = 'SELECT id, first_name, last_name FROM users WHERE email= $1;';

    db.query(queryString, [email], (err, data) => {
        if (err) {
            return errors.serverError(res);
        }
        const userInfo = {
            user_id: data.rows[0].id,
            first_name: data.rows[0].first_name,
            last_name: data.rows[0].last_name
        };

        req.userInfo = userInfo;

        next();
    });
};

export default fetchUserId;
