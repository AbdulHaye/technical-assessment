import dotenv from 'dotenv';
import path from 'path';
import { TextEncoder, TextDecoder } from 'util';

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;


// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Mock process.env if not set
process.env.DB_HOST = process.env.DB_HOST || 'db';
process.env.DB_PORT = process.env.DB_PORT || '5432';
process.env.DB_USER = process.env.DB_USER || 'developer';
process.env.DB_PASSWORD = process.env.DB_PASSWORD || 'localdev';
process.env.DB_NAME = process.env.DB_NAME || 'taskdb';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Mock Knex for tests
jest.mock('knex', () => {
  return jest.fn().mockImplementation(() => {
    return {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      returning: jest.fn().mockResolvedValue([{ id: 1, title: 'Test Task' }]), // Mock insert response
    };
  });
});