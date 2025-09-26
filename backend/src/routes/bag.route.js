// routes/bag.route.js
import express from "express";
import Bag from "../models/bag.model.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// ----------------------
// Add item to bag
// ----------------------
router.post("/add", protectRoute, async (req, res) => {
  try {
    const { sweetId, name, price, quantity } = req.body;
    if (!sweetId || !name || !price || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "All fields are required and quantity must be positive" });
    }

    const totalPrice = price * quantity;

    const bagItem = new Bag({
      user: req.user._id,
      sweet: sweetId,
      name,
      price,
      quantity,
      totalPrice,
    });

    await bagItem.save();
    res.status(200).json({ message: "Added to bag successfully", bagItem });
  } catch (error) {
    console.log("Error adding to bag:", error);
    res.status(500).json({ message: "Failed to add to bag" });
  }
});

// ----------------------
// Get all items in user's bag
// ----------------------
router.get("/", protectRoute, async (req, res) => {
  try {
    const items = await Bag.find({ user: req.user._id }).populate("sweet");
    const totalSum = items.reduce((sum, item) => sum + item.totalPrice, 0);
    res.status(200).json({ items, totalSum });
  } catch (error) {
    console.log("Error fetching bag:", error);
    res.status(500).json({ message: "Failed to fetch bag" });
  }
});

// ----------------------
// Remove an item from bag
// ----------------------
router.delete("/remove/:id", protectRoute, async (req, res) => {
  try {
    const id = req.params.id;
    await Bag.findByIdAndDelete(id);
    res.status(200).json({ message: "Item removed from bag" });
  } catch (error) {
    console.log("Error removing bag item:", error);
    res.status(500).json({ message: "Failed to remove item" });
  }
});

// ----------------------
// Clear the whole bag (optional)
// ----------------------
router.delete("/clear", protectRoute, async (req, res) => {
  try {
    await Bag.deleteMany({ user: req.user._id });
    res.status(200).json({ message: "Bag cleared successfully" });
  } catch (error) {
    console.log("Error clearing bag:", error);
    res.status(500).json({ message: "Failed to clear bag" });
  }
});

export default router;
