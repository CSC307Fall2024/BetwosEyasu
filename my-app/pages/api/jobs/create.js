import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, description, company, location, startDate, endDate } = req.body;
    try {
      const newJob = await prisma.job.create({
        data: {
          title,
          description,
          company,
          location,
          startDate: new Date(startDate),
          endDate: endDate ? new Date(endDate) : null,
        },
      });
      res.status(201).json(newJob);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create job' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
