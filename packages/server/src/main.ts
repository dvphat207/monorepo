import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { CONNECTION_CONFIG_TOKEN, IConnectionConfig } from '@/shared/config';

(async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  const { host, port } = configService.get<IConnectionConfig>(CONNECTION_CONFIG_TOKEN);
  await app.listen(port, host);
})();
