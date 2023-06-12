const userModel = require("../models/userModel");

const register = async (req, res) => {
  const { name, email, password, avatar, phone } = req.body;
  try {
    //check if user already exist
    const userExist = await userModel.findOne({ email: email });
    if (userExist) {
      return res.json({
        success: false,
        message: "User already exist with given email",
      });
    }
    const user = await userModel.create(req.body);
    return res.json({
      success: true,
      message: "Registered successfully",
      user: user,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in registration",
      error: error,
    });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    ////check if user exist
    const userExist = await userModel.findOne({ email }).select('+password');
    if (!userExist) {
      return res.json({
        success: false,
        message: "Unable to login, please enter correct credentials",
      });
    }
    //match password
    const isMatch = await userExist.comparePassword(
      password,
      userExist.password
    );
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Unable to login, please enter correct credentials",
      });
    }
    const token = await userExist.generateJWT();
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    await res.cookie("jwtToken", token, options).json({
      success: true,
      message: "LoggedIn successfully",
      user: userExist,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in login",
      error: error,
    });
  }
};

const logout = async (req, res) => {
  return res
    .cookie("jwtToken", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({ success: true, message: "Logged out successfully" });
};
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (users.length == 0) {
      return res.json({ success: false, message: "No user found" });
    }
    return res.json({ success: true, users: users });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in fetching users",
      error: error,
    });
  }
};
const deleteUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.json({
        success: false,
        message: "No user found with given Id",
      });
    }
    await userModel.deleteOne({ _id: id });
    return res.json({ success: true, message: "User deleted", user: user });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in deleting user",
      error: error,
    });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.json({
        success: false,
        message: "No user found with given Id",
      });
    }
    return res.json({ success: true, user: user });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in fetching user",
      error: error,
    });
  }
};
const updateUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.json({
        success: false,
        message: "No user found with given Id",
      });
    }
    const updatedUser = await userModel.updateOne({ _id: id }, req.body, {
      new: true,
    });
    return res.json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in updating user",
      error: error,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  getAllUsers,
  deleteUserById,
  getUserById,
  updateUserById,
};
