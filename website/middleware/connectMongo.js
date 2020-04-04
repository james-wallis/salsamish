import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const dburl = (process.env.DB_HOSTNAME)
  ? `mongodb://${process.env.DB_HOSTNAME}/salsamish`
  : `mongodb://localhost/salsamish`;

const client = new MongoClient(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auth: {
    user: 'salsa',
    password: 'example',
  },
});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('salsamish');
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;