const mongoose = require("mongoose")
// Define Mongoose schema and model for user collection
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String
});
  
module.exports = User = mongoose.model("User", userSchema);