import User from '../models/User.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private (Requires Token)
export const getUserProfile = async (req, res) => {
  // Thanks to our 'protect' middleware, req.user is already available here!
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      skillsHave: user.skillsHave,
      skillsWant: user.skillsWant,
      avatarUrl: user.avatarUrl,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private (Requires Token)
export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // Update fields if they are provided in the request body, otherwise keep existing
    user.name = req.body.name || user.name;
    user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
    user.avatarUrl = req.body.avatarUrl || user.avatarUrl;
    
    // Update skills arrays if provided
    if (req.body.skillsHave) user.skillsHave = req.body.skillsHave;
    if (req.body.skillsWant) user.skillsWant = req.body.skillsWant;

    // Save the updated user
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      bio: updatedUser.bio,
      skillsHave: updatedUser.skillsHave,
      skillsWant: updatedUser.skillsWant,
      avatarUrl: updatedUser.avatarUrl,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};