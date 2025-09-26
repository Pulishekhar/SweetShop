import express from "express";
import Sweet from "../models/sweet.model.js"; // your Sweet model
import { protectRoute } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

// ---------------------
// Add a new sweet (Admin only)
// ----------------------
router.post("/add", protectRoute, isAdmin, async (req, res) => {
  try {
    const sweets = Array.isArray(req.body) ? req.body : [req.body]; // handle single or multiple
    const addedSweets = [];
    const skippedSweets = [];

    for (const sweet of sweets) {
      const { name, category, price, quantity } = sweet;

      if (!name || !category || !price || !quantity) {
        return res.status(400).json({ message: "All fields are required for each sweet" });
      }

      // Check for duplicate sweet name
      const existingSweet = await Sweet.findOne({ name: { $regex: `^${name}$`, $options: "i" } });

      if (existingSweet) {
        skippedSweets.push(name); // keep track of skipped sweets
        continue; // skip this sweet and continue with others
      }

      const newSweet = new Sweet({ name, category, price, quantity });
      await newSweet.save();
      addedSweets.push(newSweet);
    }

    res.status(201).json({
      message: "Bulk add completed",
      added: addedSweets,
      skipped: skippedSweets
    });
  } catch (error) {
    console.log("Error adding sweet(s):", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// ----------------------
// Get all sweets (Admin only)
// ----------------------
router.get("/all", async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json(sweets);
  } catch (error) {
    console.log("Error fetching sweets:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ----------------------
// Search sweets (Admin only) with optional name, category, and price range
// ----------------------
router.get("/search", async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const filter = {};

    if (name) filter.name = { $regex: name, $options: "i" };
    if (category) filter.category = { $regex: category, $options: "i" };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(filter);
    res.status(200).json(sweets);
  } catch (error) {
    console.log("Error searching sweets:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.put("/update/:id", protectRoute, isAdmin, async (req, res) => {
  try {
    const sweetId = req.params.id;
    const { name, category, price, quantity } = req.body;

    // Check if sweet exists
    const sweet = await Sweet.findById(sweetId);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    // If name is updated, check for duplicates
    if (name && name.toLowerCase() !== sweet.name.toLowerCase()) {
      const existingSweet = await Sweet.findOne({ name: { $regex: `^${name}$`, $options: "i" } });
      if (existingSweet) {
        return res.status(400).json({ message: "Sweet with this name already exists" });
      }
      sweet.name = name;
    }

    if (category) sweet.category = category;
    if (price) sweet.price = price;
    if (quantity) sweet.quantity = quantity;

    const updatedSweet = await sweet.save();
    res.status(200).json(updatedSweet);
  } catch (error) {
    console.log("Error updating sweet:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.delete("/delete/:id", protectRoute, isAdmin, async (req, res) => {
  try {
    const sweetId = req.params.id;

    const sweet = await Sweet.findById(sweetId);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    await Sweet.findByIdAndDelete(sweetId);
    res.status(200).json({ message: "Sweet deleted successfully" });
  } catch (error) {
    console.log("Error deleting sweet:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// ----------------------
// Purchase a sweet (any authenticated user)
// ----------------------
router.post("/:id/purchase", protectRoute, async (req, res) => {
  try {
    const sweetId = req.params.id;
    const { quantity } = req.body; // quantity user wants to purchase

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be a positive number" });
    }

    const sweet = await Sweet.findById(sweetId);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({ message: "Not enough quantity available" });
    }

    // Decrease the quantity
    sweet.quantity -= quantity;
    await sweet.save();

    res.status(200).json({
      message: `Successfully purchased ${quantity} ${sweet.name}(s)`,
      remainingQuantity: sweet.quantity,
    });
  } catch (error) {
    console.log("Error purchasing sweet:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/:id/restock", protectRoute, isAdmin, async (req, res) => {
  try {
    const sweetId = req.params.id;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be a positive number" });
    }

    const sweet = await Sweet.findById(sweetId);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    sweet.quantity += quantity; // increase the quantity
    await sweet.save();

    res.status(200).json({
      message: `Restocked ${sweet.name} successfully`,
      sweet,
    });
  } catch (error) {
    console.log("Error in restocking sweet:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
export default router;