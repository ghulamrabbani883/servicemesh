const serviceModel = require("../models/serviceModel");
const { userModel } = require("../models/userModel");

const postService = async (req, res) => {
  try {
    const service = await serviceModel.create(req.body);
    return res.json({
      success: true,
      message: "Service added",
      service: service,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in adding services",
      error: error,
    });
  }
};
const getServices = async (req, res) => {
  const query = req.query;
  const queryLength = Object.keys(query).length;
  const limitService = 10;
  try {
    let services = null;
    if (queryLength > 0) {
      const { city, category } = query;
      console.log(category,city )
      if (city !== undefined && category !== undefined) {
        services = await serviceModel
          .find({
            service: category,
            "address.city":city,
          })
          .limit(limitService);
      } else if (category !== undefined) {
        services = await serviceModel
          .find({ service: category})
          .limit(limitService);
      } else if (city !== undefined) {
        services = await serviceModel
          .find({ "address.city": city})
          .limit(limitService);
      }
    } else {
      services = await serviceModel.find().limit(limitService);
    }

    if (services.length == 0) {
      return res.json({
        success: false,
        message: "No services in this website",
      });
    }
    return res.json({ success: true, services: services });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in fetching services",
      error: error,
    });
  }
};
const getServiceById = async (req, res) => {
  const id = req.params.id;
  try {
    const service = await serviceModel.findById(id);
    if (!service) {
      return res.json({
        success: false,
        message: "Requested service not available",
      });
    }
    return res.json({ success: true, service: service });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in fetching requested service",
      error: error,
    });
  }
};

const deleteServiceById = async (req, res) => {
  const id = req.params.id;
  try {
    const service = await serviceModel.findById(id);
    if (!service) {
      return res.json({
        success: false,
        message: "Requested service not available to delete",
      });
    }
    await serviceModel.deleteOne({ _id: id });
    return res.json({
      success: true,
      message: "Service deleted",
      service: service,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in deleting service",
      error: error,
    });
  }
};
const updateService = async (req, res) => {
  const id = req.params.id;
  try {
    const service = await serviceModel.findById(id);
    if (!service) {
      return res.json({
        success: false,
        message: "Requested service not available",
      });
    }
    const updatedService = await serviceModel.updateOne({ _id: id }, req.body, {
      new: true,
    });
    return res.json({
      success: true,
      message: "Service updated",
      service: updatedService,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in updating service",
      error: error,
    });
  }
};

module.exports = {
  postService,
  getServices,
  deleteServiceById,
  updateService,
  getServiceById,
};
