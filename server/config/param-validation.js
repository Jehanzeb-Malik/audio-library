import Joi from 'joi';

export default {
  // GET /api/songs
  listSongs: {
    query: {
      limit: Joi.number().integer().required(),
      skip: Joi.number().integer().required(),
    },
  },

  // GET /api/playlists
  listPlayLists: {
    query: {
      limit: Joi.number().integer().required(),
      skip: Joi.number().integer().required(),
    },
  },

  // GET /api/playlists/:id
  fetchPlaylist: {
    params: {
      id: Joi.string().required(),
    },
  },
};
