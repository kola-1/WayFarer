import express from 'express';
import validateAuth from '../middlewares/validations/validateAuth';
import checkUserExist from '../middlewares/helpers/checkUserExist';
import getUserData from '../middlewares/helpers/getUserData';
import verifyPassword from '../middlewares/helpers/verifyPassword';
import assignToken from '../middlewares/helpers/assignToken';
import encryptPassword from '../middlewares/helpers/encryptPassword';
import Authcontroller from '../controllers/AuthenticationController';


const router = express.Router();

const { validateSignup, validateSignin } = validateAuth;

// Signup a user
router.post('/signup', validateSignup, checkUserExist, encryptPassword, assignToken, Authcontroller.signUp);

// Signin a user
router.post('/signin', validateSignin, getUserData, verifyPassword, assignToken, Authcontroller.signIn);

export default router;
