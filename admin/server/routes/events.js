const express = require('express');
const router = express.Router();
const moment = require('moment');
const mongoose = require('mongoose');

const validEventTypes = ['FRIDAY', 'CHARITY', 'CUSTOM'];
const validAgendaItemTypes = ['LESSON', 'DJSET'];
const validLessonLevels = ['BEGINNERS', 'INTERMEDIATES'];

/**
 * API Function to get all events in the database
 * @returns All events in the database
 */
router.get('/', async function (req, res) {
  const model = mongoose.model('Event');
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
  const model = mongoose.model('Event');
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
  if (!moment(req.body.from).isValid()) return res.status(400).send('Invalid value given for Lower (from) date');
  if (!moment(req.body.to).isValid()) return res.status(400).send('Invalid value given for Higher (to) date');
  const model = mongoose.model('Event');
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
  const model = mongoose.model('Event');
  let { name, description, type, start, end, facebook, agenda } = req.body;
  console.log(req.body);
  type = type.toUpperCase();
  if (typeof agenda === 'string' || agenda instanceof String) agenda = JSON.parse(agenda);
  try {
    if (!name || name === '') return res.status(404).send('Missing event name');
    if (!type || type === '') return res.status(404).send('Missing event type');
    if (!(validEventTypes.includes(type))) return res.status(400).send('Invalid event type');
    if (!start || start === '') return res.status(404).send('Missing event start date and time');
    if (!end || end === '') return res.status(404).send('Missing event end date and time');
    if (!moment(start).isValid()) return res.status(400).send('Invalid value given for event start date');
    if (!moment(end).isValid()) return res.status(400).send('Invalid value given for event end date');
    if (agenda.length > 0) {
      for (let i = 0; i < agenda.length; i++) {
        const item = agenda[i];
        if (!item.name || item.name === '') return res.status(404).send('Missing agenda item name');
        if (!item.type || item.type === '') return res.status(404).send('Missing agenda item type');
        if (!(validAgendaItemTypes.includes(item.type))) return res.status(400).send('Invalid agenda item type');
        if (item.type === 'LESSON' && (!item.lesson_level || item.lesson_level === '')) return res.status(404).send('Missing agenda item lesson level');
        if (item.type === 'LESSON' && (!(validLessonLevels.includes(item.lesson_level)))) return res.status(400).send('Invalid agenda item lesson level');
        if (!item.start || item.start === '') return res.status(404).send('Missing agenda item start date and time');
        if (!item.end || item.end === '') return res.status(404).send('Missing agenda item end date and time');
        if (!moment(item.start).isValid()) return res.status(400).send('Invalid value given for agenda item start date');
        if (!moment(item.end).isValid()) return res.status(400).send('Invalid value given for agenda item end date');
        if (!item.employee || item.employee === '') return res.status(404).send('Missing agenda item employee');
        if (!await isValidEmployee(item.employee)) return res.status(400).send('Invalid id given for agenda item employee (Employee does not exist)');
      }
    }
    const instance = new model({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      description: (!description || description === '') ? description : null,
      type: type,
      date: {
        start: new Date(start),
        end: new Date(end)
      },
      facebook: (!facebook || facebook === '') ? facebook : null,
      agenda: agenda
    });
    await instance.save();
    res.send(`New event ${name} added successfully`)
  } catch (err) {
    // throw err;
    console.error(err);
    res.status(500).send(err);
  }
});

async function isValidEmployee(id) {
  const model = mongoose.model('Employee');
  try {
    return (await model.findById(id) && true);
  } catch (e) {
    return false;
  }
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