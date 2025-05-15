import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  dbHost: string;
  dbUser: string;
  dbPass: string;
  dbDatabase: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbHost: process.env.DB_HOST || 'localhost',
  dbUser: process.env.DB_USER || '',
  dbPass: process.env.DB_PASS || '',
  dbDatabase: process.env.DB_DATABASE || 'face-recognition',
};

export default config;
