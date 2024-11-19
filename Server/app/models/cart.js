const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    products: {
      type: [
        new Schema(
            {
              productId: {
                type: Schema.Types.ObjectId,
                required: true
              },
              name: {
                type: String,
                required: true
              },
              price: {
                type: Number,
                required: true
              },
              image: {
                type: String,
                required: true
              },
              quantity: {
                type: Number,
                required: true
              }
            },
            { _id: false } // Disable `_id` generation for subdocuments
          )
    ],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
