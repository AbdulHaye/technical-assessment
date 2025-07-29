import { db } from '../utils/db';
import { Status } from '../models/status';

export class StatusService {
  static async getStatus(): Promise<Status[]> {
    return await db('status').select('*');
  }
}