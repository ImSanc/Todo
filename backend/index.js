import express from 'express';
import {port} from './config'
import cors from 'cors'
import rootRouter from './routes/index'

const allowedOrigins = [
    'http://localhost:5173'
]

const app = express();
app.use(cors({
    origin : allowedOrigins
}))
app.use(express.json())


app.use('/api/v1',rootRouter);

app.use(port, ()=>{
    console.log("Server is running on port 3000")
})