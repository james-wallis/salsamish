import { ObjectID } from 'mongodb';
import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getEmployee } from '../../../lib/mongo';
import mongoMiddleware, { RequestWithMongoDb } from '../../../middleware/connectMongo';

const handler = nextConnect();

handler.use(mongoMiddleware);

handler.get<RequestWithMongoDb, NextApiResponse>(async (req, res) => {
  const id = req.query.employee as string;

  if (!id) {
    return res.status(400).end();
  }

  const employee = await getEmployee(req.db, id);
  if (!employee) {
    return res.status(404).end();
  }
  res.json(employee);
});

export default handler;