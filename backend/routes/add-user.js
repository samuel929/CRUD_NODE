const express = require("express");
const User= require('../Model/User.js')
const router=express.Router();

//Creating a User
router.post("/users", async (req, res) => {
    try {
      const { firstName, lastName, phoneNumber } = req.body.user;
    
      // Create a new user document using Mongoose model
      const user = new User({
        firstName,
        lastName,
        phoneNumber,
      });
      
      // Save the user document to the database
       await user.save();
  
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  })


  //Fetching all Users
  router.get("/users", async (req, res) => {
    try {
      
      const getUsers =  await User.find();
  
      res.status(200).json({ message: "Retrived Users",data:getUsers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  })


  //Deleting a user
  router.delete("/users/:id", async (req, res) => {
    const userId = req.params.id
    try {
      // Use findByIdAndDelete to find and delete the user by ID
      const deletedUser = await User.findByIdAndDelete(userId);
      
      if (!deletedUser) {
        // If no user with the provided ID is found
        throw new Error('User not found');
      }
      
      // If user is successfully deleted
      res.status(200).json({ message: "User deleted" });
  
    } catch (error) {
      // Handle any errors
      console.error('Error deleting user:', error.message);
      res.status(500).json({ message: "Internal server error" });
  
    }
  })

  //Finding a user by Id
  router.get("/users/:id", async (req, res) => {
    const userId = req.params.id
    try {
      // Use findByIdAndDelete to find and delete the user by ID
      const user = await User.findById(userId);
      
      if (!user) {
        // If no user with the provided ID is found
        throw new Error('User not found');
      }
      
      // If user is successfully deleted
      res.status(200).json({ message: "User Found",data:user });
  
    } catch (error) {
      // Handle any errors
      console.error('Error finding User:', error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  })

  //Finding a user by Id and updating
  router.put("/users/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const { firstName, lastName, phoneNumber} = req.body.data;
       const updateData={
        firstName,
        lastName,
        phoneNumber
       }
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  })



module.exports=router;