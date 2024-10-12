import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const job = await prisma.job.findUnique({
        where: {
          id: parseInt(id, 10),
        },
      });

      if (job) {
        res.status(200).json(job);
      } else {
        res.status(404).json({ error: 'Job not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch job' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
