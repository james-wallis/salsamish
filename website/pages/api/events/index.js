import nextConnect from 'next-connect';
import mongoMiddleware from '../../../middleware/connectMongo';

const handler = nextConnect();

handler.use(mongoMiddleware);

handler.get(async (req, res) => {
  const doc = await req.db.collection('events').find().toArray();
  res.json(doc);
});

export default handler;