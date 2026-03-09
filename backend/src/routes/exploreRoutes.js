import express from 'express';
import { exploreUsers } from '../controllers/exploreController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, exploreUsers);

export default router;