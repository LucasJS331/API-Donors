import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpFilter } from './common/http-exception.filter';
import { LoggingInterceptor } from './common/loggin-interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new HttpFilter);
  app.useGlobalInterceptors(new LoggingInterceptor);
  await app.listen(3000);

}
bootstrap();
