const express = require("express");
const router = express.Router();
const inventory = require("../data/inventoryData");

router.get('/inventory', (req, res) => {
    res.json(inventory);
});

// Add an item to the inventory
router.post("/api/inventory", (req, res) => {
  const { name, quantity, instock, category } = req.body;
  const newItem = {
    id: inventory.length + 1,
    name,
    quantity: parseInt(quantity),
    instock: instock === "true",
    category,
  };
  inventory.push(newItem);
  res.json(newItem);
});

// Update an inventory item
router.put("/api/inventory/:id", (req, res) => {
  const { id } = req.params;
  const { name, quantity, instock, category } = req.body;
  const item = inventory.find((item) => item.id === parseInt(id));
  if (item) {
    item.name = name || item.name;
    item.quantity = quantity || item.quantity;
    item.instock = instock === "true" || item.instock;
    item.category = category || item.category;
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Delete an item from the inventory
router.delete("/api/inventory/:id", (req, res) => {
  const { id } = req.params;
  const index = inventory.findIndex((item) => item.id === parseInt(id));
  if (index !== -1) {
    inventory.splice(index, 1);
    res.json({ message: "Item deleted" });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

module.exports = router;
