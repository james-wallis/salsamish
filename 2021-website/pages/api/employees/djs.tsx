import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import mongoMiddleware, { RequestWithMongoDb } from '../../../middleware/connectMongo';

const handler = nextConnect();

handler.use(mongoMiddleware); 

handler.get<RequestWithMongoDb, NextApiResponse>(async (req, res) => {
  const type = req.query.type as string;
  const dbQuery: { role: string, stylesOfMusic?: string } = { role: 'DJ' };

  if (type && ['BACHATA', 'KIZOMBA'].includes(type.toUpperCase())) {
    dbQuery.stylesOfMusic = type.toUpperCase();
  }

  const doc = await req.db.collection('employees').find(dbQuery).toArray();
  res.json(doc);
});

export default handler;