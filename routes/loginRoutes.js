import express from 'express';
import {
    registerUser,loginUser,checkToken
} from '../controllers/loginController.js';

const router = express.Router();
router.route('/register')
    .post(registerUser)
router.post('/login', loginUser);
router.post('/checkToken', checkToken);

export { router }