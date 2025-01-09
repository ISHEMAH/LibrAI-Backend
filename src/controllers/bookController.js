const Book = require('../models/bookModel');

// Create a new book
const createBook = async (req, res) => {
  const { title, author, category, description } = req.body;

  try {
    const book = await Book.create({
      title,
      author,
      category,
      description,
      user: req.user._id, // Authenticated user
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('user', 'name email');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a book
const updateBook = async (req, res) => {
  const { title, author, category, description } = req.body;

  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Check if the logged-in user owns the book
    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.category = category || book.category;
    book.description = description || book.description;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      // Check if the logged-in user owns the book
      if (book.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }
  
      await book.deleteOne(); // Correct method for deletion
      res.json({ message: 'Book removed successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};
