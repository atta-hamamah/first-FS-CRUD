import express from 'express';
import Book from './bookMod.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allBooks = await Book.find({});
    res.status(200).json({ data: allBooks });
  } catch (error) {
    console.log(error);
  }
});
router.post('/add', async (req, res) => {
  const book = req.body;
  if (!book.name || !book.author) {
    return res.status(400).json({ msg: 'add required data' });
  }
  const newBook = new Book(book);
  try {
    await newBook.save();
    res.status(200).json({ suc: true, msg: `${book.name} is added` });
  } catch (error) {
    console.error(error.msg);
    res.status(500).json({ suc: false });
  }
});
router.delete('/delete/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: `${req.params.id} deleted` });
  } catch (error) {
    res.status(400).json({ msg: error.massage });
  }
});
router.put('/update/:id', async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ new: updated.name });
  } catch (error) {
    console.log(error);
  }
});

export default router;
