import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { mongoURL } from './config.js';
import bookRouter from './bookMethods.js';
const app = express()
const PORT = 8080

app.use(cors())
app.use(express.json())
app.use('/', bookRouter)

mongoose.connect(mongoURL).then(() => {
    console.log('DB is running')
    app.listen(PORT, () => {
        console.log(`${PORT} is listing `)
    })
}
).catch(error => {
    console.log(error)
})