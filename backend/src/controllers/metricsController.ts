import { Request, Response } from 'express';
import { MetricsService } from '../services/metricsService';

export class MetricsController {
  static async getMetrics(req: Request, res: Response): Promise<void> {
    try {
      const { timeRange } = req.query;
      const validTimeRange = timeRange === 'hour' || timeRange === 'week' ? timeRange : 'day';
      const data = await MetricsService.getMetrics(validTimeRange as 'hour' | 'day' | 'week');
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch metrics' });
    }
  }
}