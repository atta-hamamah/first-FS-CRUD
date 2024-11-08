import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { mongoURL } from './config.js';
import Book from './bookMod.js';

const app = express()
const PORT = 8080

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send({ msg: 'hi from server' })
})

app.post('/add', async (req, res) => {
    const book = req.body
    if (!book.name || !book.author) {
        return res.status(400).json({ msg: 'add required data' })
    }
    const newBook = new Book(book)
    try {
        await newBook.save()
        res.status(200).json({ suc: true, data: book })
    } catch (error) {
        console.error(error.msg)
        res.status(500).json({ suc: false })
    }
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