import express, { Application, Request, Response } from 'express';
import { bookRoutes } from './controllers/bookController';
import { borrowRoutes } from './controllers/borrowControllers';


const app: Application = express();

app.use(express.json())

app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Note App');
});


export default app;