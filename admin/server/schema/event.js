const mongoose = require('mongoose');
const { Schema } = mongoose;

const validEventTypes = ['FRIDAY', 'CHARITY', 'CUSTOM'];
const validAgendaItemTypes = ['LESSON', 'DJSET'];
// Null added as an enum so that the mongoose test will pass when lesson_level isn't included
const validLessonLevels = [null, 'BEGINNERS', 'INTERMEDIATES'];

const agenda = {
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        uppercase: true,
        enum: validAgendaItemTypes,
        required: true,
    },
    lesson_level: {
        type: String,
        uppercase: true,
        enum: validLessonLevels,
    },
    start: {
        type: Date,
        required: true,
    }, 
    end: {
        type: Date,
        required: true,
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
};

const EventSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        name: {
            type: String,
            required: true,
            default: 'Salsa Mish',
        },
        description: {
            type: String,
        },
        date: {
            start: {
                type: Date,
                required: true,
            }, 
            end: {
                type: Date,
                required: true,
            },
        },
        type: {
            type: String,
            uppercase: true,
            enum: validEventTypes,
            default: 'FRIDAY',
            required: true,
        },
        facebook: {
            type: String,
        },
        agenda: [agenda],
    }
);

mongoose.model('Event', EventSchema);