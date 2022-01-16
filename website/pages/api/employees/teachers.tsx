import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getTeachers } from '../../../lib/mongo';
import mongoMiddleware, { RequestWithMongoDb } from '../../../middleware/connectMongo';

const handler = nextConnect();

handler.use(mongoMiddleware);

handler.get<RequestWithMongoDb, NextApiResponse>(async (req, res) => {
  const teachers = await getTeachers(req.db);
  res.json(teachers);
});

export default handler;