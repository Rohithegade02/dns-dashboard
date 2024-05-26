import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import RecordRouter from './routes/record.js'
import cors from 'cors';
//create express app
const app = express();


dotenv.config();


// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Database Connected'))
app.use(express.json());
app.use(cors())

// record route
app.use('/api/v1/records', RecordRouter);

app.get('/',  (req,res) => {
  res.send('Helo Server')
})
// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT} `);
});