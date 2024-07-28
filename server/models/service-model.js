const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
});

const service = new mongoose.model("Services", serviceSchema);
module.exports = service;
