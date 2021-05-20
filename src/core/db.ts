import mongoose from 'mongoose';
import { logger } from '../config/logger';
import config from '../config/config';

const db = mongoose.connection;

db.on('error', () => {
  logger.error('DB: mongoDB connection is not open');
  logger.info('DB: killing myself so that container restarts');
});

db.once('open', () => {
  logger.info('DB: mongoDB connection is established');
});

interface mongoDBInfo {
  host: string;
  username: string;
  port: number;
  password: string;
  database: string;
}

const getMongoDBUrl = (auth: boolean, dbInfo?: mongoDBInfo): string => {
  let url: string;
  if (auth) {
    return `mongodb://localhost:27017/${config.MongoDatabase}`;
  }

  url = `mongodb://${config.MongoUser}:${config.MongoPassword}@${config.MongoHost}:${config.MongoPort}/${config.MongoDatabase}`;

  return url;
};

export default class Database {
  url: string = getMongoDBUrl(false, {
    host: config.MongoHost,
    username: config.MongoUser,
    port: config.MongoPort,
    password: config.MongoPassword,
    database: config.MongoDatabase,
  });

  constructor() {
    if (config.MongoAuthDisable) {
      this.url = getMongoDBUrl(config.MongoAuthDisable);
    }

    logger.info(`DB: DATABASE URL: ${this.url}`);
  }

  connect() {
    return mongoose.connect(
      this.url,
      {
        autoIndex: false,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      },
      (err) => {
        if (err) {
          logger.error('DB: MongoDB Connection Error:', err);
          process.exit(1);
        }
      }
    );
  }
}
