import express from 'express';

import { createStudent, getStudents, deleteStedent, updateStudent, getCount } from "../controllers/students.js";

const router = express.Router();


router.post('/', createStudent);
router.get('/',getStudents);
router.get('/count',getCount);
router.patch('/:id', updateStudent);
router.delete('/:id', deleteStedent);

export default router;