const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: false,
      },
    },
  ],

  totalPrice: {
    type: Number,
    required: true,
  },

  shippingAddress: {
    name: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: false,
    },
    street: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: false,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {collection: "Orders"});


const Order = mongoose.model("Order", orderSchema);
module.exports = Order;