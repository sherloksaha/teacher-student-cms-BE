import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { AdminSeed } from './seed.admin';



async function bootstrap() {
  const app =
    await NestFactory.createApplicationContext(
      AppModule,
    );

  try {
    const adminSeed =
      app.get(AdminSeed);

    await adminSeed.run();

    console.log('Seeding completed');
  } catch (error) {
    console.error(error);
  } finally {
    await app.close();
  }
}

bootstrap();