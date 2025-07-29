// tests/metricsController.test.ts
import { MetricsController } from '../src/controllers/metricsController';
import { Request, Response } from 'express';
import { MetricsService } from '../src/services/metricsService';

// Mock the MetricsService class
jest.mock('../src/services/metricsService');

describe('MetricsController', () => {
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  it('should return metrics data for default time range', async () => {
    const mockMetrics = [
      { timestamp: '2025-06-27T16:00:00Z', value: 75 },
      { timestamp: '2025-06-27T15:00:00Z', value: 80 },
    ];
    jest.spyOn(MetricsService, 'getMetrics').mockResolvedValue(mockMetrics);

    const mockRequest: Partial<Request> = { query: { timeRange: 'day' } };
    await MetricsController.getMetrics(mockRequest as Request, mockResponse as Response);

    expect(MetricsService.getMetrics).toHaveBeenCalledWith('day');
    expect(mockResponse.json).toHaveBeenCalledWith(mockMetrics);
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    jest.spyOn(MetricsService, 'getMetrics').mockRejectedValue(new Error('Test error'));
    const mockRequest: Partial<Request> = { query: { timeRange: 'day' } };
    await MetricsController.getMetrics(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Failed to fetch metrics' });
  });
});