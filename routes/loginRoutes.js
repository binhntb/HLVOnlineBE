import express from 'express';
import {
    registerUser,loginUser
} from '../controllers/loginController.js';

const router = express.Router();
router.route('/register')
    .post(registerUser)
router.post('/', loginUser);
export { router }