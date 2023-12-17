import { registerAs } from '@nestjs/config';

export const DATABASE_CONFIG_TOKEN = 'database';

export interface IDatabaseConfig {
  host: string;
  port: number;

  username: string;
  password: string;
  dbName: string;
  authSource: string;
}

export const DatabaseConfig = registerAs(
  DATABASE_CONFIG_TOKEN,
  (): IDatabaseConfig => ({
    host: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT, 10),
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    dbName: process.env.MONGO_DB,
    authSource: process.env.MONGO_AUTH_SOURCE
  })
);
