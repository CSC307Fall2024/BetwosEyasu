import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { title, description, company, location, startDate, endDate } = req.body;

    try {
      const updatedJob = await prisma.job.update({
        where: { id: parseInt(id, 10) },
        data: {
          title,
          description,
          company,
          location,
          startDate: new Date(startDate),
          endDate: endDate ? new Date(endDate) : null,
        },
      });
      res.status(200).json(updatedJob);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update job' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
