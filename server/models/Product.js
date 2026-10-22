import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
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
    qty: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "department",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestams: true },
);
const ProductModel = mongoose.model("product", ProductSchema);
export default ProductModel;
