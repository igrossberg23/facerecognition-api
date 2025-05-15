import { Router } from 'express';
import { createUser, signIn } from '../controllers/userController.ts';

const router = Router();

router.post('/signin', signIn);
router.post('/register', createUser);

export default router;
