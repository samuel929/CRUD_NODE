const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserRouter = require("./routes/add-user.js");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Main Route
app.use("/api",UserRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
