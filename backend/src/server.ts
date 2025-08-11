import express, { Application } from 'express'
const app: Application = express();

import dotenv from 'dotenv'
import errorHandler from './middleware/errorHandler';
import './jobs/pinger'


// Required Middlewares
import cookieParser from 'cookie-parser'
import cors from 'cors'

// ENVs
dotenv.config()
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
}));
app.use(cookieParser())
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})