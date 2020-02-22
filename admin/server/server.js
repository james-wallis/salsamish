const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const dburl = (process.env.DB_HOSTNAME) 
  ? `mongodb://${process.env.DB_HOSTNAME}/salsamish` 
  : `mongodb://localhost/salsamish`;

mongoose.connect(dburl, {
  useNewUrlParser: true, auth: {
    user: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,
  }
});

// Mongoose Schemas
require('./schema/user');
require('./schema/employee');
require('./schema/event');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Express Routes
// app.use('/api/images', express.static(path.join(__dirname, '../images')))
app.use('/api/user', require('./routes/user'))
app.use('/api/employees', require('./routes/employees'))
app.use('/api/events', require('./routes/events'))

const port = process.env.PORT || 3001;

// In production there is the need to serve the React files.
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static('/app/build'));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join('/app/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));