import express from 'express';
 

import { createUser, loginUser } from '../Controllers/UserControler.js';


const user_router = express.Router();

user_router.post('/signup', createUser);
user_router.post('/login', loginUser);

export default user_router;