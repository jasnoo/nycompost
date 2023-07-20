const mongoose = require('mongoose')

const siteSchema = new mongoose.Schema({
  borough: {
    required: true,
    type: String,
    enum: ['Bronx', 'Brooklyn', 'Manhattan', 'Queens', 'Staten Island'],
    trim: true
  },
  neighborhood: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  address: {
    required: true,
    type: String,
    trim: true
  },
  org: {
    type: String,
    trim: true
  },
  day_schedule: {
    type: [{ type: Number, enum: [0, 1, 2, 3, 4, 5, 6] }],
    default: []
  },
  month_schedule: {
    type: [{ type: Number, enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }],
    default: []
  },
  schedule_notes: {
    type: String,
    trim: true
  },
  other_notes: {
    type: String,
    trim: true
  },
  accepts_meat: {
    type: Boolean
  },
  user_submitted: {
    type: Boolean,
    default: true
  }


}, { versionKey: false })

module.exports = mongoose.model('Site', siteSchema)