import express, { Application, Request, Response, NextFunction } from 'express';
import connectDB from './db';
import cors from 'cors';
import { userRouter } from './app/modules/users/user.routes';
import { categoryRouter } from './app/modules/category/category.routes';
import { foodRouter } from './app/modules/foods/food.routes';
import { authRouter } from './app/modules/auth.ts/auth.routes';
import { orderRouter } from './app/modules/orders/order.routes';


const app: Application = express();
const PORT = process.env.PORT || 4040;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();


// Route
app.get('/', (req:Request, res:Response) => {
    console.log("hit on /")
    res.json({ message: 'Hello World' });
})

app.use('/api/auth', authRouter);
app.use('/api', userRouter);
app.use('/api', categoryRouter);
app.use('/api', foodRouter );
app.use('/api', orderRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
