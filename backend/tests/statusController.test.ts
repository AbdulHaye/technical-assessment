// tests/statusController.test.ts
import { StatusController } from '../src/controllers/statusController';
import { Request, Response } from 'express';
import { StatusService } from '../src/services/statusService';

// Mock the StatusService class
jest.mock('../src/services/statusService');

describe('StatusController', () => {
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  it('should return status data', async () => {
    const mockStatus = [{ id: 1, status: 'active', timestamp: '2025-06-27T16:00:00Z' }];
    // Spy on the static getStatus method
    jest.spyOn(StatusService, 'getStatus').mockResolvedValue(mockStatus);

    const mockRequest: Partial<Request> = {};
    await StatusController.getStatus(mockRequest as Request, mockResponse as Response);

    expect(StatusService.getStatus).toHaveBeenCalled();
    expect(mockResponse.json).toHaveBeenCalledWith(mockStatus);
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    // Override the mock for this test
    jest.spyOn(StatusService, 'getStatus').mockRejectedValue(new Error('Test error'));
    const mockRequest: Partial<Request> = {};
    await StatusController.getStatus(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Failed to fetch status' });
  });
});