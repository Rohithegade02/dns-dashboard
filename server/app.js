import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import UserRoutes from './routes/userRoute.js'
import cookieParser from 'cookie-parser';
import configAWS from './config/aws.js';
import domainRoute from "./routes/domainRoute.js"
import dnsRoute from './routes/dnsRoute.js'
const app = express(); //create a app

dotenv.config();

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('Database Connected'))
app.use(express.json());
app.use(cors())
app.use(cookieParser())
configAWS()  //config aws file

app.use('/api/v1/user', UserRoutes) //user route
app.use('/api/v1/domain',domainRoute) //domain route
app.use('/api/v1/dns',dnsRoute) // dns route
app.get('/',  (req,res) => {
  res.send('Hello Server')
})

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT} `);
});