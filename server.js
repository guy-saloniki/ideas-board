const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const ideasRouter = require('./routes/ideas');
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

// Initial db
connectDB();

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors middleware
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5000'],
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the ideas board app!' });
});

//Routes
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`server is listening on port: ${port}`));
