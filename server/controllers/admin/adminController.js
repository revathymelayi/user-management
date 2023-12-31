const User = require("../../models/usersMdl");
const bcrypt = require("bcrypt");
require("dotenv").config();
const moment = require("moment");

const users = async (req, res) => {
  
  try {
    
    const users = await User.find({ isAdmin: false });
    if (users) {
      return res.status(200).json({ users });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const createUser = async (req, res) => {
  const { name, email, phone, password, profilePic } = req.body;
  const { isAdmin } = req.user;

  try {
    if (!isAdmin) {
      return res.status(400).json({ message: "You are not authenticated !!" });
    }
    if (!name || !email || !phone || !password || !profilePic) {
      return res.status(400).json({ message: "All fields are required !!" });
    }
    const isUser = await User.findOne({ email: email });
    if (isUser) {
      return res.status(400).json({ message: "User already exists !!" });
    }
    const newUser = User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      phone,
      profilePic,
      isAdmin: false,
      status: true,
      createdAt: moment().format("YYYY-MM-DD"),
    });
    const resUser = await newUser.save();
    if (resUser) {
      return res.status(201).json({ message: "User Registered Successfully" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const userDetails = async (req, res) => {
  try {
    if (!req.params.userId) {
      return res.status(400).json({ message: "Invalid user" });
    }
    const isUser = await User.findById(req.params.userId);
    if (!isUser) {
      return res.status(400).json({ message: "Invalid user" });
    }
    return res
      .status(200)
      .json({ user: isUser });
  } catch (error) {}
};

const editUser = async (req, res) => {
  const { name, phone } = req.body;
  const userId = req.params.userId;
  try {
    if (!userId) {
      return res.status(400).json({ message: "Invalid user" });
    }
    const isUser = await User.findById(userId);
    let imageName = "";
    if (req.file) {
      imageName = req.file.filename;
    } else {
      imageName = isUser.profilePic;
    }
    const userUpdate = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { name, phone, profilePic: imageName } },
      { new: true }
    );
    if (!userUpdate) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    return res
      .status(200)
      .json({ message: "update Successfully", token, user: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!req.params.userId) {
      return res.status(400).json({ message: "Invalid entry" });
    }
    const userDelete = User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: { status: 0 } }
    );
    if (!userDelete) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    return res.status(200).json({ message: "User deleted successfully !!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const blockUser = async (req, res) => {
  try {
    if (!req.params.userId) {
      return res.status(400).json({ message: "Invalid entry" });
    }
    const userId = req.params.userId;
    const userInfo = await User.findById(userId).then(async (data, err) => {
      if (data.status) {
        const user = await User.findByIdAndUpdate(userId, { status: false });
      } else {
        const user = await User.findByIdAndUpdate(userId, { status: true });
      }
      return res.status(200).json({ message: "User status changed !!" });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  users,
  createUser,
  editUser,
  deleteUser,
  blockUser,
  userDetails,
};
