import { Request, Response } from 'express';
import { StatusService } from '../services/statusService';

export class StatusController {
  static async getStatus(req: Request, res: Response): Promise<void> {
    try {
      const data = await StatusService.getStatus();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch status' });
    }
  }
}