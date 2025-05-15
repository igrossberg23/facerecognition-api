import { Router } from 'express';
import { processImage } from '../controllers/userController.ts';

const router = Router();

router.post('/process-image', processImage);

export default router;
