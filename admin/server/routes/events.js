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
        await model.find()
            .populate('agenda.employee')
            .exec((err, evs) => {
                if (err) return res.status(500).send('Error populating events');
                return res.send(evs);
            });
    } catch (err) {
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
    req.body.from = old.toISOString();
    req.body.to = '2013-08-05T13:08:24.149Z';
    const { from: fromDate, to: toDate } = res.body;
    if (!fromDate) return res.status(404).send('Lower (from) date missing');
    if (!toDate) return res.status(404).send('Higher (to) date missing');
    if (!moment(fromDate).isValid()) return res.status(400).send('Invalid value given for Lower (from) date');
    if (!moment(toDate).isValid()) return res.status(400).send('Invalid value given for Higher (to) date');
    const model = mongoose.model('Event');
    try {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        const events = await model.find({
            'date.start': {
                $gte: from.toISOString(),
                $lte: to.toISOString(),
            },
        });
        res.send(events);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

/**
 * API Function to get a single event from the database which comes after a given date
 * Used to show the most upcoming event
 * @params date - The date to get the next event after
 * @returns All events in the database
 */
router.get('/next/:date', async function (req, res) {
    const { date: paramDate } = req.params;
    if (!paramDate) return res.status(404).send('Date missing');
    if (!moment(paramDate).isValid()) return res.status(400).send('Invalid value given for date');
    const model = mongoose.model('Event');
    try {
        const date = new Date(paramDate);
        await model.find({
            'date.start': {
                $gte: date.toISOString(),
            },
        })
            .populate('agenda.employee')
            .exec((err, events) => {
                if (err) return res.status(500).send('Error populating event with employees');
                const [nextEvent] = events;
                return res.send(nextEvent);
            });
    } catch (err) {
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
    const { id } = req.params;
    const model = mongoose.model('Event');
    try {
        if (eventExists(id)) {
            model.findById(id).populate('agenda.employee')
                .exec((err, event) => {
                    if (err) return res.status(500).send(`Error populating Mongoose query with ID ${id}`);
                    return res.send(event);
                });
        } else {
            res.status(404).send('ID does not exist');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

/**
 * API Function to create a new event in the database
 */
router.post('/', async function (req, res) {
    try {
        const event = await validateEventRequest(req, res);
        const id = await saveEventToDatabase(event);
        res.send({ id });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

/**
 * API Function to update an existing event in the database
 */
router.put('/:id', async function (req, res) {
    const { id } = req.params;
    try {
        const exists = await eventExists(id);
        if (exists) {
            const event = await validateEventRequest(req, res);
            await updateEventInDatabase(event, id);
            res.send(`Existing event ${event.name} updated successfully`);
        } else {
            res.status(404).send('ID does not exist');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

/**
 * API Function to delete an event from the database
 */
router.delete('/:id', async function (req, res) {
    const { id } = req.params;
    const model = mongoose.model('Event');
    try {
        const event = await model.findById(id);
        await event.remove();
        res.sendStatus(200);
    } catch (err) {
        if (err.name === 'CastError') res.status(404).send('ID does not exist');
        res.status(500).send(err);
    }
});

async function validateEventRequest(req, res) {
    let { name, description, type, start, end, facebook, agenda } = req.body;
    type = type.toUpperCase();
    if (typeof agenda === 'string' || agenda instanceof String) agenda = JSON.parse(agenda);
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
    return { name, description, type, start, end, facebook, agenda };
}

async function isValidEmployee(id) {
    const model = mongoose.model('Employee');
    try {
        return (await model.findById(id) && true);
    } catch (e) {
        return false;
    }
}

async function saveEventToDatabase(event) {
    const { name, description, type, start, end, facebook, agenda } = event;
    const model = mongoose.model('Event');
    const _id = new mongoose.Types.ObjectId();
    const instance = new model({
        _id,
        name,
        description: (!description || description === '') ? description : null,
        type,
        date: {
            start: new Date(start),
            end: new Date(end),
        },
        facebook: (!facebook || facebook === '') ? facebook : null,
        agenda,
    });
    await instance.save();
    return _id;
}

async function updateEventInDatabase(event, id) {
    const model = mongoose.model('Event');
    await model.updateOne({ _id: id}, event);
}

async function eventExists(id) {
    const model = mongoose.model('Event');
    try {
        await model.findById(id);
        return true;
    } catch(e) {
        return false;
    }
}

module.exports = router;