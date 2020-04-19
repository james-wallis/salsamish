const mongoose = require('mongoose');
const { Schema } = mongoose;

const role = ['DJ', 'TEACHER'];

const EmployeeSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        name: {
            type: String,
            required: true,
        },
        urlSafeName: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            uppercase: true,
            enum: role,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        stylesOfMusic: {
            type: [String],
            default: undefined,
        },
        typesOfDance: {
            type: [String],
            default: undefined,
        },
    }
);

mongoose.model('Employee', EmployeeSchema);