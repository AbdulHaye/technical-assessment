import { db } from '../utils/db';
import { Task } from '../models/task';
import { z } from 'zod';

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  user_id: z.number().optional(),
});

export class TaskService {
  static async createTask(data: any): Promise<Task> {
    const validatedData = taskSchema.parse(data);
    const [task] = await db('tasks').insert(validatedData).returning('*');
    return task;
  }

  static async getTasks(): Promise<Task[]> {
    return await db('tasks').select('*');
  }
}