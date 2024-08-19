// models/apiUsage.model.js
const mongoose = require('mongoose');

const apiUsageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  endpoint: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const ApiUsage = mongoose.model('ApiUsage', apiUsageSchema);
module.exports = ApiUsage;
