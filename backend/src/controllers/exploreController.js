import User from '../models/User.js';

// @desc    Get all users or search by skill
// @route   GET /api/explore?skill=react
// @access  Private
export const exploreUsers = async (req, res) => {
  try {
    // If a skill query is provided, search both skillsHave and skillsWant arrays
    const keyword = req.query.skill
      ? {
          $or: [
            { skillsHave: { $regex: req.query.skill, $options: 'i' } }, // 'i' means case-insensitive
            { skillsWant: { $regex: req.query.skill, $options: 'i' } },
          ],
        }
      : {};

    // Find users matching the keyword, but EXCLUDE the currently logged-in user
    const users = await User.find({ ...keyword, _id: { $ne: req.user._id } })
      .select('-password'); // Always hide the password!

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};