import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getEventByDate, getEventWithEmployees } from '../../../lib/mongo';
import mongoMiddleware, { RequestWithMongoDb } from '../../../middleware/connectMongo';

const handler = nextConnect();

handler.use(mongoMiddleware);

handler.get<RequestWithMongoDb, NextApiResponse>(async (req, res) => {
  if (!req.query.date) {
    return res.status(400).end();
  }

  const unformattedDate = req.query.date as string;
  const date = new Date(unformattedDate);
  // Check valid date
  if (!(date instanceof Date)) {
    return res.status(400).end();
  }

  const event = await getEventByDate(req.db, date);
  if (!event) {
    return res.status(404).end();
  }

  const eventWithEmployees = await getEventWithEmployees(req.db, event);
  
  return res.json(eventWithEmployees);
});

export default handler;