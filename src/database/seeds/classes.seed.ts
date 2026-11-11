import { DataSource } from 'typeorm';
import { Class } from 'src/core/modules/classes/entities/class.entity';

const classNames = [
  'KG',
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
];

export async function seedClasses(dataSource: DataSource) {
  const classRepository = dataSource.getRepository(Class);

  const uniqueClassNames = [...new Set(classNames.map((name) => name.trim()).filter(Boolean))];

  if (!uniqueClassNames.length) return;

  const classEntities = uniqueClassNames.map((name) => ({ name }));

  await classRepository.upsert(classEntities, {
    conflictPaths: ['name'],
    skipUpdateIfNoValuesChanged: true,
  });

  console.log('Classes seeded');
}

