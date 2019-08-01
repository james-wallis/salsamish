const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      uppercase: true,
      enum: ['DJ', 'TEACHER'],
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }
)

mongoose.model('Employee', EmployeeSchema);