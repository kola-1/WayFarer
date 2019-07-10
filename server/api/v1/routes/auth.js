import express from 'express';
import validateAuth from '../middlewares/validations/validateAuth';
import checkUserExist from '../middlewares/helpers/checkUserExist';
import assignToken from '../middlewares/helpers/assignToken';
import encryptPassword from '../middlewares/helpers/encryptPassword';
import Authcontroller from '../controllers/AuthenticationController';

const router = express.Router();

const { validateSignup } = validateAuth;

// Signup a user
router.post('/signup', validateSignup, checkUserExist, assignToken, encryptPassword, Authcontroller.signUp);

export default router;
