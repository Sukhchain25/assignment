// models/user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  licensePlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LicensePlan',
    required: true,
  },
  apiCallsUsed: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('User', userSchema);
