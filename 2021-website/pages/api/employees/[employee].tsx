import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import mongoMiddleware, { RequestWithMongoDb } from '../../../middleware/connectMongo';

const handler = nextConnect();

handler.use(mongoMiddleware);

handler.get<RequestWithMongoDb, NextApiResponse>(async (req, res) => {
  const {
    query: { employee },
  } = req

  if (!employee) {
    return res.status(400).end();
  }

  const doc = await req.db.collection('employees').findOne({ urlSafeName: employee });
  if (!doc) {
    return res.status(404).end();
  }
  res.json(doc);
});

export default handler;