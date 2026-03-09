import Swap from '../models/Swap.js';
import User from '../models/User.js';

// @desc    Create a new skill swap request
// @route   POST /api/swaps
// @access  Private
export const createSwapRequest = async (req, res) => {
  try {
    const { receiverId, skillOffered, skillRequested } = req.body;

    if (!receiverId || !skillOffered || !skillRequested) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Prevent duplicate active requests between the same two users
    const existingSwap = await Swap.findOne({
      requester: req.user._id,
      receiver: receiverId,
      status: { $in: ['pending', 'accepted'] }
    });

    if (existingSwap) {
      return res.status(400).json({ message: 'An active swap request already exists with this user' });
    }

    const swap = await Swap.create({
      requester: req.user._id,
      receiver: receiverId,
      skillOffered,
      skillRequested,
      status: 'pending' // Default status
    });

    res.status(201).json(swap);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all swaps for the logged-in user
// @route   GET /api/swaps
// @access  Private
export const getUserSwaps = async (req, res) => {
  try {
    // Find swaps where the user is EITHER the requester OR the receiver
    const swaps = await Swap.find({
      $or: [{ requester: req.user._id }, { receiver: req.user._id }]
    })
    // .populate() grabs the actual user data instead of just returning their ID string
    .populate('requester', 'name avatarUrl skillsHave')
    .populate('receiver', 'name avatarUrl skillsHave')
    .sort({ updatedAt: -1 }); // Sort by newest first

    res.json(swaps);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};