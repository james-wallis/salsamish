const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agenda = {
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    uppercase: true,
    enum: ['LESSON', 'DJSET'],
    required: true
  },
  time: {
    start: {
      type: Date,
      required: true
    }, 
    end: {
      type: Date,
      required: true
    }
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  }
}

const EventSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
      default: 'Salsa Mish'
    },
    description: {
      type: String
    },
    date: {
      start: {
        type: Date,
        required: true
      }, 
      end: {
        type: Date,
        required: true
      }
    },
    type: {
      type: String,
      uppercase: true,
      enum: ['FRIDAY', 'CHARITY'],
      default: 'FRIDAY',
      required: true
    },
    fbLink: {
      type: String,
    },
    agenda: [agenda]
  }
)

mongoose.model('Event', EventSchema);