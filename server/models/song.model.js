import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
/**
 * Song Schema
 */
const SongSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  artists: {
    type: Array,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
/**
 * Methods
 */
SongSchema.method({
});
/**
 * Statics
 */
SongSchema.statics = {
  /**
   * Find song
   * @param {string} name - The name of song.
   * @returns {Promise<Song[], APIError>}
   */
  findByName(name) {
    return this.find({
      name: {
        $regex: name,
        $options: 'i',
      },
    })
      .exec()
      .then((songs) => {
        if (songs) {
          return songs;
        }
        const err = new APIError('No such song exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
  /**
   * List songs in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of songs to be skipped.
   * @param {number} limit - Limit number of songs to be returned.
   * @returns {Promise<Songs[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
};
/**
 * @typedef Song
 */
export default mongoose.model('Song', SongSchema);
