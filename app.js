const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sticky-notes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Note Schema
const noteSchema = new mongoose.Schema({
  content: { type: String, required: true, minLength: 1 },
});

// Define Note Model
const Note = mongoose.model('Note', noteSchema);

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route to display all notes
app.get('/notes', async (req, res) => {
  const notes = await Note.find({});
  res.render('notes', { notes });
});

// Route to add a new note
app.get('/new-note', (req, res) => {
  res.render('new-note');
});

app.post('/add-note', async (req, res) => {
  const { content } = req.body;
  const note = new Note({ content });
  await note.save();
  res.redirect('/notes');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
