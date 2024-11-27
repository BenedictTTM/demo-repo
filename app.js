const express = require('express');
const { ConnectToDb, getDb } = require('./db'); // Assuming your ConnectToDb function is in a db.js file

const app = express();
const port = 3000;  // You can change the port if necessary

// Initialize db as null initially
let db = null;
app.use(express.json())
// Connect to the database
ConnectToDb()
  .then(() => {
    console.log('Successfully connected to the database');
    db = getDb(); // Get the db instance only after successful connection

    // Once the DB is connected, start the Express server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// Define a simple route to test if everything is working
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Route to get books
app.get('/books', (req, res) => {
  let books = [];
  db.collection('books')
    .find()
    .sort({ author: 1 })
    .forEach((book) => {
      books.push(book);
    })
    .then(() => {
      res.status(200).json(books);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Could not fetch elements' });
    });
});


// app.post('/books',(req,res)=>{
//   const book = req.body

//   db.connection('books')
//   .insertOne(book)
//   .then(result=>{
//     res.status(201).json(result)
//   })
//   .catch(err => {
//     res.status(201).json({err:"Could not find connection"})
//   })
// })

app.post('/books', (req, res) => {
  const book = req.body;

  db.collection('books') // Corrected to use 'collection'
    .insertMany(book)
    .then((result) => {
      res.status(201).json({ message: 'Book added successfully', result });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Could not add the book' });
    });
});
