import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getAllEvents } from '../../../lib/mongo';
import mongoMiddleware, { RequestWithMongoDb } from '../../../middleware/connectMongo';

const handler = nextConnect();

handler.use(mongoMiddleware);

handler.get<RequestWithMongoDb, NextApiResponse>(async (req, res) => {
  const events = await getAllEvents(req.db);
  res.json(events);
});

export default handler;