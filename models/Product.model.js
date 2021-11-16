const { Schema, model } = require("mongoose");


const productSchema = new Schema(
  {
    name: String,
    quantity: Number,
    price: Number
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;