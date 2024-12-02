const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generalImageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { _id: false } // Disable automatic _id generation
);


module.exports = mongoose.model('GeneralImages', generalImageSchema);