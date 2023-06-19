// const http = require('http');
const express = require('express');
const app = express();
require('./config/dbConnection');
// const contactRoutes = require('./controllers/contactsController');
// const registerRoutes = require('./controllers/resgiterController');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const listRoutes = require('./routes/listRoutes');

// connectDB();

app.listen(3000, () => {
  console.log('Backend server running ...');
});

app.use(express.json());

// app.use('/contacts', contactRoutes);       // controller
// app.use('/register', registerRoutes);      // controller
// ------------------------------------------------------
app.use('/api/auth', authRoutes);          // routes
app.use('/api/user', userRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api/list', listRoutes);


app.use('/', (req, res) => {
  res.json({ msg: 'General res' });
});

// http.createServer((req, res) => {
//   // res.statusCode = 200;
//   // res.setHeader ('Content-Type', 'text/plain');
//   // res.end(req.socket.localAddress); // check
// }).listen(3000,() => {
//   console.log(`Server running at http://${hostname}:${port}/`);
//   // console.log("hello");
// });


