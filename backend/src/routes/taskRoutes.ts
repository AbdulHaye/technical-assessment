import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.post('/', authenticate, TaskController.createTask);
router.get('/', authenticate, TaskController.getTasks);

export default router;