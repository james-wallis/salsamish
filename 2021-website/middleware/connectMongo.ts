import type { NextApiRequest, NextApiResponse } from 'next'
import { Db, MongoClient } from 'mongodb'
import nextConnect from 'next-connect'

// const dburl = (process.env.DB_HOSTNAME)
//   ? `mongodb://${process.env.DB_HOSTNAME}/salsamish`
//   : `mongodb://localhost/salsamish`;

const dburl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gdroi.mongodb.net/salsamish?retryWrites=true&w=majority`;

export interface RequestWithMongoDb extends NextApiRequest {
  dbClient: MongoClient;
  db: Db;
}

const client = new MongoClient(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // auth: {
  //   user: 'salsa',
  //   password: 'example',
  // },
});

async function database(req: RequestWithMongoDb, res: NextApiResponse, next: () => void) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('salsamish');
  return next();
}

const middleware = nextConnect<NextApiRequest, NextApiResponse>();

middleware.use(database);

export default middleware;