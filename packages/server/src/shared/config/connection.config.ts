import { registerAs } from '@nestjs/config';

export const CONNECTION_CONFIG_TOKEN = 'connection';

export interface IConnectionConfig {
  host: string;
  port: number;
}

export const ConnectionConfig = registerAs(
  CONNECTION_CONFIG_TOKEN,
  (): IConnectionConfig => ({
    host: process.env.HOST,
    port: parseInt(process.env.PORT, 10)
  })
);
