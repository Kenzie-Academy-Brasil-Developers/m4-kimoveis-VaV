import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import { handleErrors } from './errors/handleErrors';
import userRoutes from './routes/users.route';
import categoryRoutes from './routes/categories.route';
import scheduleRoutes from './routes/schedules.route';
import loginRoutes from './routes/login.route';

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/schedules', scheduleRoutes);
app.use('/login', loginRoutes);

app.use(handleErrors);

export default app;
