import B2 from 'backblaze-b2';
import Song from '../models/song.model';
import config from '../config/config';

const debug = require('debug')('audio-library:song.controller');

const b2 = new B2({
  accountId: config.b2.accountId,
  applicationKey: config.b2.applicationKey,
});

/**
 * Get song list.
 * @property {number} req.query.skip - Number of songs to be skipped.
 * @property {number} req.query.limit - Limit number of songs to be returned.
 * @returns {Song[]}
 */
const list = (req, res, next) => {
  debug('here');
  const { limit = 50, skip = 0 } = req.query;
  Song.list({ limit, skip })
    .then(songs => res.json(songs))
    .catch(e => next(e));
};

export default { list };
