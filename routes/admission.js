import express from 'express';

import { getAd, getAds, createAd, updateAd, deleteAd, getCount } from '../controllers/admission.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAds);
router.post('/', createAd);
router.get('/count',getCount);
router.get('/:id', getAd);
router.patch('/:id', updateAd);
router.delete('/:id', deleteAd);

export default router;