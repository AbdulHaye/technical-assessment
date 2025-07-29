import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authenticate, rateLimit } from '../middleware';
import register from '../monitoring/metrics';

const app = express();

const routes = {
  '/users': 'http://user-service:3001',
  '/tasks': 'http://task-service:3002',
  '/notifications': 'http://notification-service:3003',
};

Object.entries(routes).forEach(([path, target]) => {
  app.use(path, authenticate, rateLimit, createProxyMiddleware({ target, changeOrigin: true }));
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(3000, () => console.log('Gateway running on port 3000'));