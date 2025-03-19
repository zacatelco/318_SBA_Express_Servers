const express = require("express");
const bodyParser = require("body-parser");
const inventoryRouter = require("./routes/inventoryRouter"); 
const inventory = require("./data/inventoryData");

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

// Set the template engine to EJS
app.set("view engine", "ejs");

// Serve static files (if needed)
app.use(express.static("public"));

// Home Route - Render Inventory View
app.get("/", (req, res) => {
    res.render("index", { inventory });
});

// Use Inventory API Routes
app.use("/api/inventory", inventoryRouter);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
