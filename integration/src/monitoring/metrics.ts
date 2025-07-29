import client from 'prom-client';

const register = new client.Registry();
register.setDefaultLabels({
  app: 'api-gateway'
});
register.registerMetric(new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'path']
}));

export default register;