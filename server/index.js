import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { mongoURL } from './config.js';
import book from './bookMod.js'

const app = express()
const PORT = 8080

app.use(cors())

app.get('/api/home', (req, res) => {
    res.json({ msg: 'hi from server' })
})
app.get('/', (req, res) => {
    res.send({ msg: 'hi from server' })
})

mongoose.connect(mongoURL).then(() => {
    console.log('DB is running')
    app.listen(PORT, () => {
        console.log(`${PORT} is listing `)
    })
}
).catch(error => {
    console.log(error)
})

