import mongoose from 'mongoose';
import util from 'util';
import config from './server/config/config';
import app from './server/config/express';


const debug = require('debug')('audio-library:index');

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

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// listen on port config.port
app.listen(config.port, () => {
  /* eslint no-console: ["error", { allow: ["info"] }] */
  console.info(`server started on port ${config.port} (${config.env})`);
});

export default app;
