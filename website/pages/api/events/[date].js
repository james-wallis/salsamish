import nextConnect from 'next-connect';
import mongoMiddleware from '../../../middleware/connectMongo';

const handler = nextConnect();

handler.use(mongoMiddleware);

handler.get(async (req, res) => {
  const { date: unformattedDate } = req.query;

  if (!unformattedDate) {
    return res.status(400).end();
  }

  const date = new Date(unformattedDate);
  // Check valid date
  if (!(date instanceof Date && !isNaN(date))) {
    return res.status(400).end();
  }

  const dayAfterDate = new Date(unformattedDate);
  dayAfterDate.setDate(date.getDate() + 1);

  const query = {
    "date.start": {
      $gte: date,
      $lt: dayAfterDate
    }
  }
  
  const doc = await req.db.collection('events').findOne(query);
  if (!doc) {
    return res.status(404).end();
  }
  
  return res.json(doc);
});

export default handler;