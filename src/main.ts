import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { Logger } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.intercepter';
import { HttpExceptionFilter } from './core/filters/http-exception-filter';


async function bootstrap() {
  const logger = new Logger('Bootstrap')
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'verbose']
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
  }
  bootstrap();
  app.enableCors({
    origin: 'http://localhost:3002',
    credentials: true,
  });
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
