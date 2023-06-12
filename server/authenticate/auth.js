const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const isAuthentic = async (req, res, next) => {
    const { jwtToken } = req.cookies;
  if (!jwtToken) {
    return res.json({
      success: false,
      message: "Please login to access this resource",
    });
  }
  const decodedData = jwt.verify(jwtToken, process.env.SECRET_KEY);
  req.user = await userModel.findById(decodedData.id);

  next();
};

const isAuthorized = (role) => {    
  return async (req, res, next) => {
    if (role !== "admin") {
      return res.json({
        success: false,
        message: "Only admin can access this resource",
      });
    }
    next();
  };
};

module.exports = { isAuthentic, isAuthorized };
