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
    required: true,
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
    type: [Number],
    default: []
  },
  month_schedule: {
    type: [Number],
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


})

module.exports = mongoose.model('Site', siteSchema)