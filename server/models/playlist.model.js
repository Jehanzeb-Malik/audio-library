import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
/**
 * PlayList Schema
 */
const PlayListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  songs: [{ type: mongoose.Schema.ObjectId, ref: 'Song' }],
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
PlayListSchema.method({
});
/**
 * Statics
 */
PlayListSchema.statics = {
  /**
   * Find playlist
   * @param {string} id - ObjectId of playlist.
   * @returns {Promise<PlayList[], APIError>}
   */
  findPlayListById(id) {
    return this.findById(id)
      .populate('songs')
      .exec();
  },
  /**
   * List playlists in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of playlists to be skipped.
   * @param {number} limit - Limit number of playlists to be returned.
   * @returns {Promise<PlayList[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: 1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
};
/**
 * @typedef PlayList
 */
export default mongoose.model('PlayList', PlayListSchema);
