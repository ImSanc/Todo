
import express from 'express';
import userRouter from './user.js';
import todoRouter from './todo.js';

const router = express.Router();

router.use('/user',userRouter);
router.use('/todos',todoRouter);

export default router;