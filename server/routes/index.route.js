import express from 'express';
import songRoutes from './song.route';

const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => {
  res.send('OK');
});

// mount song routes at /songs
router.use('/songs', songRoutes);

export default router;
