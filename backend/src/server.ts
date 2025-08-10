import express, { Application } from 'express'
const app: Application = express();

import dotenv from 'dotenv'
import errorHandler from './middleware/errorHandler';

// ENVs
dotenv.config()
const PORT = process.env.PORT || 8000;


app.use(errorHandler)
app.listen(() => {
    console.log(`Server listening on PORT ${PORT}`)
})