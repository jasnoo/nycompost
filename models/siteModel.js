const mongoose = require('mongoose')

const siteSchema = new mongoose.Schema({
    borough: {
        required: true,
        type: String
    },
    neighborhood: {
        type: String
    },
    location: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    org: {
        type: String
    },
    day_schedule: {
        type: [Number],
        default: []
    },
    month_schedule: {
        type: [Number],
        default: []
    },
    schedule_notes: {
        type: String
    },
    other_notes: {
        type: String
    },
    accepts_meat: {
        type: Boolean
    },
    user_submitted: {
        type: Boolean
        default: true
    }


})

module.exports = mongoose.model('Site', siteSchema)