import Joi from 'joi';

export default {
  // GET /api/songs
  listSongs: {
    query: {
      limit: Joi.number().integer().required(),
      skip: Joi.number().integer().required(),
    },
  },
};
