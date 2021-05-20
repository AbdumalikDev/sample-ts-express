import dotenv from 'dotenv';
dotenv.config();

const getConfig = (name: string, def: string = ''): string => {
  if (process.env[name]) {
    return process.env[name] || '';
  }

  return def;
};

interface Config {
  HttpPort: string;
  MongoHost: string;
  MongoPort: number;
  MongoDatabase: string;
  MongoPassword: string;
  MongoUser: string;
  MongoAuthDisable: boolean;
}

let config: Config = {
  HttpPort: getConfig('HTTP_PORT', '5000'),
  MongoHost: getConfig('MONGO_HOST', 'localhost'),
  MongoPort: parseInt(getConfig('MONGO_PORT', '27017')),
  MongoDatabase: getConfig('MONGO_DATABASE', 'sample_project'),
  MongoPassword: getConfig('MONGO_PASSWORD', ''),
  MongoUser: getConfig('MONGO_USER', ''),
  MongoAuthDisable: true,
};

export default config;
