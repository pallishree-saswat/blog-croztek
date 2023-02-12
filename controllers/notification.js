
const Notification = require("../models/notification")

const { ObjectId } = require("mongodb");

module.exports = {

  getNotification: async (req, res) => {
    try {
      const notifcation = await Notification.find({ createdBy: req.user._id });
      return res
        .status(200)
        .json({
          success: true,
          message: `${notifcation.length} notifcations`,
          response: notifcation,
        });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error",
          error: error.message,
        });
    }
  },
  postNotification: async (req, res) => {
    try {
      const { _id } = req.user;
      const { postId,commentId , replyId } = req.body;
      const isExist = await Notification.findOne({
        $and: [{ postId}, { commentId }],
      });
      if (isExist) {
        return res
          .status(403)
          .json({
            success: false,
            message: "Notification already exist",
            response: {},
          });
      }
      const newNotification = await new Notification({
        commentId,
        replyId,
        postId,
        createdBy: _id,
      });
      await newNotification.save();
      return res
        .status(200)
        .json({
          success: false,
          message: "New Notification Created successfully",
          response: newNotification,
        });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error",
          error: error.message,
        });
    }
  },
  deleteNotification: async (req, res) => {
    try {
      const { _id } = req.user;
      const { notifcationId } = req.query;
      const notifcation = await Notification.findByIdAndDelete({_id : ObjectId(notifcationId)});

      
      if (!notifcation) {
        return res
          .status(404)
          .json({ success: false, message: "Invalid id", response: {} });
      }
      return res
        .status(200)
        .json({
          success: true,
          message: "Notifcation deleted successfully",
          response: notifcation,
        });
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error",
          error: error.message,
        });
    }
  },
  
  
};