// src/services/metricsService.ts
import { db } from '../utils/db';
import { Metrics } from '../models/metrics';

export class MetricsService {
  static async getMetrics(timeRange: 'hour' | 'day' | 'week'): Promise<Metrics[]> {
    let query = db('metrics').select('*');
    if (timeRange === 'hour') {
      query = query.where('timestamp', '>=', db.raw("NOW() - INTERVAL '1 hour'"));
    } else if (timeRange === 'day') {
      query = query.where('timestamp', '>=', db.raw("NOW() - INTERVAL '1 day'"));
    } else if (timeRange === 'week') {
      query = query.where('timestamp', '>=', db.raw("NOW() - INTERVAL '1 week'"));
    }
    return await query;
  }
}