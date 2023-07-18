import express from 'express';
import {
    registerUser,loginUser,checkToken,firstLogin
} from '../controllers/loginController.js';

const router = express.Router();
router.route('/register')
    .post(registerUser)
router.post('/login', loginUser);
router.post('/checkToken', checkToken);
router.post('/firstLogin', firstLogin);

export { router }