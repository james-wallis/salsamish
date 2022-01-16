import type { NextApiRequest, NextApiResponse } from 'next'
import { Db, MongoClient } from 'mongodb'
import nextConnect from 'next-connect'
import { getClient, getSalsaDb } from '../lib/mongo'
export interface RequestWithMongoDb extends NextApiRequest {
  dbClient: MongoClient;
  db: Db;
}

async function database(req: RequestWithMongoDb, res: NextApiResponse, next: () => void) {
  const client = await getClient();
  req.dbClient = client;
  req.db = getSalsaDb(client);
  return next();
}

const middleware = nextConnect<NextApiRequest, NextApiResponse>();

middleware.use(database);

export default middleware;