const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const systemConfigSchema = new Schema({
      numOfUploadedImages: {
        type: Number,
        required: true
      },
      numOfAuthenticatedImages: {
        type: Number,
        required: true
      },
      numOfRelationTypes: {
        type: Number,
        required: true
      },
      numOfImageEachRelationType: {
        type: Number,
        required: true
      },
}, {timestamps: true})

module.exports = mongoose.model('SystemConfig', systemConfigSchema);