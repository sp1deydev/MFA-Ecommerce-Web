const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema(
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

module.exports = imageSchema;


const userSchema = new Schema({
      username: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      firstname: {
        type: String,
        required: true
      },
      lastname: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      role: {
        type: String,
        required: true,
        defaut: "user",
      },
      images: [imageSchema],
      relationtypes: [String],
      relationships: [{
        images: [imageSchema],
        relationtype: String,
      }
      ],
      isConfig: {
        type: Boolean,
        default: false,
      },
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);