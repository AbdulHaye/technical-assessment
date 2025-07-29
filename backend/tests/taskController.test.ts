// tests/taskController.test.ts
import { TaskController } from '../src/controllers/taskController';
import { Request, Response } from 'express';
import { TaskService } from '../src/services/taskService';

// Mock the TaskService class
jest.mock('../src/services/taskService');

describe('TaskController', () => {
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    // Clear all mocks to prevent state leakage
    jest.clearAllMocks();
  });

  it('should create a task', async () => {
    const mockTask = { id: 1, title: 'Test Task' };
    // Spy on the static createTask method
    jest.spyOn(TaskService, 'createTask').mockResolvedValue(mockTask);

    const mockRequest: Partial<Request> = { body: { title: 'Test Task' } };
    await TaskController.createTask(mockRequest as Request, mockResponse as Response);

    expect(TaskService.createTask).toHaveBeenCalledWith({ title: 'Test Task' });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockTask);
  });
});