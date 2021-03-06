const express = require("express");
const exphbs = require("express-handlebars");
const hbs = require("handlebars");
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");
const bodyParser = require("body-parser");
const path = require("path");

// Database
const db = require("./config/database");

// Test db
db.authenticate()
    .then(() => console.log("Database Connected..."))
    .catch(err => console.log(`Error: ${err}`))

// Start express
const app = express();

// Handlebars
app.engine("handlebars", exphbs({ 
    defaultLayout: "main", 
    handlebars: allowInsecurePrototypeAccess(hbs)
}));
app.set("view engine", "handlebars");

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use (express.static(path.join(__dirname, "public")));

// Index Route
app.get("/", (req, res) => res.render("index", { layout: "landing" }));

// Gig routes
app.use("/gigs", require("./routes/gigs"))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port: ${PORT}...`));