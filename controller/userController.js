var express = require("express");
const User = require("../model/userModel");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

exports.get = (req, res, next) => {
  try {
    User.find({})
      .then((data) => res.json({ data }))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
}

exports.post = async (req, res) => {
  try {
    const { firstName, email, password } = req.body;
    const pwd = await bcrypt.hash(password, 10)

    const newUser = new User({
      firstName,
      email,
      password: pwd,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Registration failed", error: error.message });
  }
}

exports.fetchUser = (req, res, next) => {
  try {
    const ID = req.params.id;

    User.findOne({ _id: ID })
      .then((data) => res.json({ data }))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
}

exports.deleteUser = (req, res, next) => {
  try {
    const ID = req.params.id;
    User.deleteOne({ _id: ID })
      .then((data) => res.json({ data }))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
}

exports.updatedUser = async (req, res, next) => {
  try {
    const { firstName, email } = req.body; // Remove _id as it's already in the route params
    const userId = req.params.id; // Get the user ID from route params
    const updatedUser = await User.findByIdAndUpdate(userId, {
      firstName,
      email,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: "Request Failed", error: error.message });
  }
}


exports.singlefetchuser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "token unavaible" });
  }
  const tokenVal = token.split(" ")[1];
  console.log(tokenVal);

  try {
    const decoded = jwt.verify(tokenVal, "xfgfghfhdsffjhj");
    console.log(decoded);
    const userID = decoded._id;

    User.findOne({ _id: userID })
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: "not found" });
        }
        res.status(200).json({ data });
      })
      .catch((err) => res.json(err));
  } catch (err) {
    res.status(401).json({ msg: " invalid token" });
  }
}