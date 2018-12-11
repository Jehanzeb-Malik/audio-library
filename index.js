import mongoose from 'mongoose';
import util from 'util';
import logger from 'morgan';
import config from './server/config/config';
import app from './server/config/express';

// eslint-disable-next-line
export const io = require('socket.io')();
export const socket = {};


const debug = require('debug')('audio-library:index');

io.listen(config.socketPort);
/* eslint no-console: ["error", { allow: ["log"] }] */
debug('Socket connection listening on port: ', config.socketPort);

io.on('connection', (ioInstance) => {
  debug('User connected');
  socket.client = ioInstance;
  ioInstance.on('songSelected', (data) => {
    debug('Client selected a song', JSON.stringify(data));
    io.emit('playNotification', data);
  });
});

io.on('songSelected', (data) => { debug(data); });

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, {
  keepAlive: 1,
  useNewUrlParser: true,
});
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}


if (config.env === 'development') {
  app.use(logger('dev'));
}

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// listen on port config.port
app.listen(config.port, () => {
  /* eslint no-console: ["error", { allow: ["info"] }] */
  console.info(`server started on port ${config.port} (${config.env})`);
});

export default app;
