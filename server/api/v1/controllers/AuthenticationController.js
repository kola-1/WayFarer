import db from '../models/dbConnect';
import errors from '../middlewares/errors/errorHandler';


class AuthController {
    /**
    * Signup a user
    *@param {object} req The request *.
    *@param {object} res The response *.
    *@returns {object} returns response *
    */
    static signUp(req, res) {
        const {
            first_name, last_name, email
        } = req.body;

        const { token, hashedPassword } = req;

        const queryString = 'INSERT INTO users(first_name, last_name, email, password) values($1, $2, $3, $4) RETURNING id, is_admin';
        const queryValues = [first_name, last_name, email, hashedPassword];
        db.query(queryString, queryValues, (err, user) => {
            if (err) {
                return errors.serverError(res);
            }

            return res.status(201).json({
                status: 'success',
                data: {
                    user_id: user.rows[0].id,
                    is_admin: user.rows[0].is_admin,
                    token
                }
            });
        });
    }


    /**
    * Signin a user
    *@param {*} req The request *.
    *@param {*} res The response *.
    *@returns {object} returns response *
    */
    static signIn(req, res) {
        const { token, userInfo } = req;

        return res.status(200).json({
            status: 'success',
            data: {
                user_id: userInfo.user_id,
                is_admin: userInfo.is_admin,
                token
            }
        });
    }
}

export default AuthController;
