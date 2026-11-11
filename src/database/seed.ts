import { AppDataSource } from './data-source';
import { seedAdmin } from './seeds/admin.seed';
import { seedClasses } from './seeds/classes.seed';

async function runSeed() {
  await AppDataSource.initialize();

  await seedAdmin(AppDataSource);
  await seedClasses(AppDataSource);

  await AppDataSource.destroy();
}

runSeed()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });