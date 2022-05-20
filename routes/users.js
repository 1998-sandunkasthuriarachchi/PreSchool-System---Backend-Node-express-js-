import express from 'express';

import { signin, signup, getUsers, updateUser, deleteUser } from '../controllers/users.js';

const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);

router.get('/',getUsers);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;