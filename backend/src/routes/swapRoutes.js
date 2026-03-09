import express from 'express';
import { createSwapRequest, getUserSwaps } from '../controllers/swapController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createSwapRequest)
  .get(protect, getUserSwaps);

export default router;