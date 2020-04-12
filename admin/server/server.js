const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { validateProcessEnvs } = require('./modules/utils');
const withAuth = require('./middleware/authentication');

const { DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, PORT, NODE_ENV } = process.env;

validateProcessEnvs();

const dburl = (DB_HOSTNAME) 
  ? `mongodb://${DB_HOSTNAME}/salsamish` 
  : `mongodb://localhost/salsamish`;
console.log(`Using database url: ${dburl}`);

mongoose.connect(dburl, {
  useNewUrlParser: true, auth: {
    user: DB_USERNAME, 
    password: DB_PASSWORD,
  }
});

mongoose.connection.on('connected', () => 'MongoDB connected');
mongoose.connection.on('error', (err) => `MongoDB error: ${err}`);
mongoose.connection.on('disconnected', () => 'MongoDB disconnected');

// Mongoose Schemas
require('./schema/user');
require('./schema/employee');
require('./schema/event');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Express Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/employees', withAuth, require('./routes/employees'))
app.use('/api/events', withAuth, require('./routes/events'))

const port = PORT || 3001;

// In production there is the need to serve the React files.
if (NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static('/app/build'));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join('/app/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));