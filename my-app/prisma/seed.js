const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.job.create({
    data: {
      title: 'Software Engineer',
      description: 'Worked on building a modern web application.',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      startDate: new Date('2020-01-01'),
      endDate: new Date('2022-01-01'),
    },
  });

  await prisma.job.create({
    data: {
      title: 'Backend Developer',
      description: 'Implemented APIs and database solutions.',
      company: 'DataSoft',
      location: 'New York, NY',
      startDate: new Date('2018-05-01'),
      endDate: null,  // Currently working
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
