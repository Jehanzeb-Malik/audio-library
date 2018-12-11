import Playlist from '../models/playlist.model';

// const debug = require('debug')('audio-library:playlist.controller');

/**
 * Get playlists
 * @property {number} req.query.skip - Number of items to be skipped.
 * @property {number} req.query.limit - Limit number of items to be returned.
 * @returns {Playlist[]}
 */
const list = (req, res, next) => {
  const { limit = 50, skip = 0 } = req.query;
  Playlist.list({ limit, skip })
    .then(playlists => res.json(playlists))
    .catch(e => next(e));
};


/**
 * Get playlist by id
 * @property {number} req.param.id - ObjectId of the playlist
 * @returns {Playlist[]}
 */
const fetchPlaylist = (req, res, next) => {
  const { id } = req.params;
  Playlist.findPlayListById(id)
    .then(playlist => res.json(playlist))
    .catch(e => next(e));
};


export default { list, fetchPlaylist };
