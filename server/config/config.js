import Joi from 'joi';

// require and configure dotenv (will load vars in .env in PROCESS.ENV)
require('dotenv').config();

// define validation for all the env vars
const schema = Joi.object().keys({
  NODE_ENV: Joi.string()
    .allow(['development', 'production'])
    .default('development'),
  PORT: Joi.number()
    .default(3000),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false),
    }),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017),
  B2_ACCOUNT_ID: Joi.string().required()
    .description('BackBlaze B2 Account ID'),
  B2_APPLICATION_KEY: Joi.string().required()
    .description('BackBlaze B2 Application Key'),
  B2_BUCKET_ID: Joi.string().required()
    .description('BackBlaze B2 Bucket ID'),
  SOCKET_PORT: Joi.number()
    .default(5000),
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, schema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT,
  },
  b2: {
    accountId: envVars.B2_ACCOUNT_ID,
    applicationKey: envVars.B2_APPLICATION_KEY,
    bucketId: envVars.B2_BUCKET_ID,
  },
  socketPort: envVars.SOCKET_PORT,
};

export default config;
