const mongoose = require('mongoose');


const setupMongoose = async() => {
  const { DB_HOSTNAME, DB_USERNAME, DB_PASSWORD } = process.env;

  mongoose.connection.on('connected', () => {
    console.log('MongoDB Connection Established')
  })

  mongoose.connection.on('reconnected', () => {
    console.log('MongoDB Connection Reestablished')
  })

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB Connection Disconnected')
  })

  mongoose.connection.on('close', () => {
    console.log('MongoDB Connection Closed')
  })

  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB error: ${err}`)
  })

  const dburl = (DB_HOSTNAME)
    ? `mongodb://${DB_HOSTNAME}/salsamish`
    : `mongodb://localhost/salsamish`;
  console.log(`Using database url: ${dburl}`);

  const mongoOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
      user: DB_USERNAME,
      password: DB_PASSWORD,
    },
    autoReconnect: true,
    reconnectTries: 1000000,
    reconnectInterval: 3000,
  };

  await mongoose.connect(dburl, mongoOpts);

  // Mongoose Schemas
  require('../schema/user');
  require('../schema/employee');
  require('../schema/event');
}

module.exports = {
  setupMongoose,
}