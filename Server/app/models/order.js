const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    products: {
        type: Array,
        required: true
    },
    address: {
      type: String,
      required: true
    },
    cityName: {
      type: String,
      required: true
    },
    districtName: {
      type: String,
      required: true
    },
    wardName: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
