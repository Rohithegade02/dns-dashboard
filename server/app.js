import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import RecordRouter from './routes/record.js'
import cors from 'cors';
import UserRouter from './routes/user.js'
import cookieParser from 'cookie-parser';

const app = express();


dotenv.config();


// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Database Connected'))
app.use(express.json());
app.use(cors())
app.use(cookieParser())
// record route
app.use('/api/v1/records', RecordRouter);
app.use('/api/v1/user', UserRouter)


app.get('/',  (req,res) => {
  console.log(req.cookies)
})
// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT} `);
});