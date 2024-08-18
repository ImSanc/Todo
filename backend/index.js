import express from 'express';
import {port} from './config.js'
import cors from 'cors'
import rootRouter from './routes/index.js'
import { errorHandlingMiddleWare } from './middleware.js';

const allowedOrigins = [
    'http://localhost:5173'
]

const app = express();
app.use(cors({
    origin : allowedOrigins
}))
app.use(express.json())

app.use(errorHandlingMiddleWare);
app.use('/api/v1',rootRouter);


app.listen(port, ()=>{
    console.log("Server is running on port 3000")
})
