const express = require("express");
const router = express.Router();
let inventory = require("../data/inventoryData");

// Get all inventory items
router.get("/", (req, res) => {
    res.json(inventory);
});

// Get a single item by ID
router.get("/:id", (req, res) => {
    const item = inventory.find((item) => item.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
});

// Add a new inventory item
router.post("/", (req, res) => {
    const { name, quantity, instock, category } = req.body;
    const newItem = {
        id: inventory.length + 1,
        name,
        quantity: parseInt(quantity),
        instock: instock === "true",
        category,
    };
    inventory.push(newItem);
    res.redirect("/");
});

// Delete an item
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    inventory = inventory.filter((item) => item.id !== id);
    res.json({ message: "Item deleted" });
});

module.exports = router;
