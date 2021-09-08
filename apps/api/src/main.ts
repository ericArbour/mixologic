import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DbQueryFailedFilter } from './app/utils/db-query-failed-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new DbQueryFailedFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
