import { Router } from 'express';
import { StatusController } from '../controllers/statusController';

const router = Router();
router.get('/', StatusController.getStatus);

export default router;