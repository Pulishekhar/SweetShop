// models/bag.model.js
import mongoose from "mongoose";

const BagItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sweet: { type: mongoose.Schema.Types.ObjectId, ref: "Sweet", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
}, { timestamps: true });

const Bag = mongoose.model("Bag", BagItemSchema);
export default Bag;
