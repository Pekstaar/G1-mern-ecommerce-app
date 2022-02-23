const mongoose = require("mongoose");

// const ProductSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true, unique: true },
//     desc: { type: String, required: true },
//     img: { type: String, required: true },
//     categories: { type: Array },
//     size: { type: Array },
//     color: { type: Array },
//     price: { type: Number, required: true },
//     inStock: { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );

var ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
