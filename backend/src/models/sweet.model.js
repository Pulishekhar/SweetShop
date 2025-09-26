import mongoose from "mongoose";

const SweetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const Sweet = mongoose.model("Sweet", SweetSchema);

export default Sweet;
