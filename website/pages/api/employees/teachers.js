import nextConnect from 'next-connect';
import mongoMiddleware from '../../../middleware/connectMongo';

const handler = nextConnect();

handler.use(mongoMiddleware);

handler.get(async (req, res) => {
  const dbQuery = { role: 'TEACHER' };

  const doc = await req.db.collection('employees').find(dbQuery).toArray();
  res.json(doc);
});

export default handler;