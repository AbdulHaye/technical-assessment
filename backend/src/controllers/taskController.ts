// src/controllers/taskController.ts
import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';

export class TaskController {
  static async createTask(req: Request, res: Response) {
    try {
      const task = await TaskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async getTasks(req: Request, res: Response) {
    try {
      const tasks = await TaskService.getTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  }

  // Add updateTask, deleteTask, etc.
}