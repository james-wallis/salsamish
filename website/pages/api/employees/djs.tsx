import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getDJs } from '../../../lib/mongo';
import mongoMiddleware, { RequestWithMongoDb } from '../../../middleware/connectMongo';

const handler = nextConnect();

handler.use(mongoMiddleware); 

handler.get<RequestWithMongoDb, NextApiResponse>(async (req, res) => {
  const type = req.query.type as string;
  const djs = await getDJs(req.db, type);
  res.json(djs);
});

export default handler;