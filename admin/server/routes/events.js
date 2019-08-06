const express = require('express');
const router = express.Router();

/**
 * API Function to get all events in the database
 * @returns All events in the database
 */
router.get('/', async function (req, res) {
  // Retrieve mongoose variable from app.locals
  const m = req.app.locals.mongoose;
  const model = m.model('Event');
  try {
    const events = await model.find();
    // createDummyEvent(m, model)
    res.send(events)
  } catch (err) {
    // throw err;
    console.error(err);
    res.status(500).send(err);
  }
});

/**
 * API Function to get a single event using its ID
 * The returned event will have the employee data filled rather than just an ID 
 * @returns A single event
 */
router.get('/:id', async function (req, res) {
  const id = req.params.id;
  // Retrieve mongoose variable from app.locals
  const m = req.app.locals.mongoose;
  const model = m.model('Event');
  try {
    // Check ID exists
    await model.findById(id);
    model.findById(id).populate('agenda.employee')
    .exec((err, event) => {
      if (err) return res.status(500).send('Error populating Mongoose query with ID ' + id);
      console.log(event);
      return res.send(event);
    })
  } catch (err) {
    // throw err;
    if (err.name === 'CastError') res.status(404).send('ID does not exist')
    console.error(err);
    res.status(500).send(err);
  }
});

/**
 * API Function to get all events in the database which are inclusive of the given dates
 * Used to fetch events in a given bracket (To show the next few events)
 * @params from - The oldest date to get events from
 * @params to - The most recent date to get the events up to
 * @returns All events in the database
 */
router.get('/date', async function (req, res) {
  const old = new Date(2000, 10, 10);
  console.log(old.toISOString());
  req.body.from = old.toISOString();
  req.body.to = "2013-08-05T13:08:24.149Z";
  if (!req.body.from || req.body.from === '') return res.status(404).send('Lower (from) date missing');
  if (!req.body.to || req.body.to === '') return res.status(404).send('Higher (to) date missing');
  if (!verifyDate(req.body.from)) return res.status(400).send('Invalid value given for Lower (from) date');
  if (!verifyDate(req.body.to)) return res.status(400).send('Invalid value given for Higher (to) date');
  // Retrieve mongoose variable from app.locals
  const m = req.app.locals.mongoose;
  const model = m.model('Event');
  try {
    // Create mongoose query
    const from = new Date(req.body.from);
    const to = new Date(req.body.to);
    const events = await model.find({
      'date.start': {
        $gte: from.toISOString(),
        $lte: to.toISOString()
      }
    })
    res.send(events);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
})

/**
 * API Function to create a new event in the database
 * @returns 
 */
router.post('/', async function (req, res) {
  // Retrieve mongoose variable from app.locals
  const m = req.app.locals.mongoose;
  const model = m.model('Event');
  try {
    const events = await model.find();
    createDummyEvent(m, model)
    res.send(events)
  } catch (err) {
    // throw err;
    console.error(err);
    res.status(500).send(err);
  }
});

function verifyDate(string) {
  const d = new Date(string);
  return d instanceof Date && !isNaN(d);
}

async function createDummyEvent(m, model) {
  const instance = new model({
    _id: new m.Types.ObjectId(),
    name: 'SalsaMish',
    date: {
      start: new Date(2019, 10, 10),
      end: new Date(2019, 11, 10)
    },
    agenda: [{
      name: 'Kizomba',
      type: 'DJSET',
      time: {
        start: new Date(2019, 10, 10),
        end: new Date(2019, 11, 10)
      },
      employee: new m.Types.ObjectId('5d477485c2a4792f12a8515e')
    }]
  });
  await instance.save();
}

// const event = await model.find({
//   date.start: {
//     $lte: d
//   }
// })

module.exports = router