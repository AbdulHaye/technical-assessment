import express from 'express';
import { json } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDoc from './docs/openapi.yaml';
import { router as metricsRouter } from './routes/metricsRoutes';
import { router as statusRouter } from './routes/statusRoutes';
import { router as taskRouter } from './routes/taskRoutes';

const app = express();
app.use(json());

app.use('/api/metrics', metricsRouter);
app.use('/api/status', statusRouter);
app.use('/api/tasks', taskRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));