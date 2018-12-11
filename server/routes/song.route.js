import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';

import songCtrl from '../controllers/song.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

/** GET /api/songs/ */
  .get(validate(paramValidation.listSongs), songCtrl.list);

export default router;
