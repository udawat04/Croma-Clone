const mongoose = require("mongoose");

const addToCartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      _id: { type: String, required: true }, // productId
      name: String,
      price: Number,
      image: String,
      category: String,
      // Add more fields as per your data structure
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const AddToCart = mongoose.model("AddToCart", addToCartSchema);
module.exports = AddToCart;
