import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggegInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggegInUserId },
    }).select("-password"); /* not adding currently login user */

    res.status(200).json({ filteredUsers });
  } catch (error) {
    console.error("Error in getUsersForSidebar: " + error.message);
    res.status(500).json({ error: "Interval server error" });
  }
};
