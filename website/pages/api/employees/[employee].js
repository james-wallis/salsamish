import nextConnect from 'next-connect';
import mongoMiddleware from '../../../middleware/connectMongo';

const handler = nextConnect();

handler.use(mongoMiddleware);

handler.get(async (req, res) => {
  const {
    query: { employee },
  } = req

  const doc = await req.db.collection('employees').findOne({ urlSafeName: employee });
  res.json(doc);
});

export default handler;