import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';

import playListCtrl from '../controllers/playlist.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

/** GET /api/playlists */
  .get(validate(paramValidation.listSongs), playListCtrl.list);

router.route('/:id')
/** GET /api/playlists/: */
  .get(validate(paramValidation.fetchPlaylist), playListCtrl.fetchPlaylist);

export default router;
