import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Ensure `id` is a string and then convert it to an integer
      const job = await prisma.job.findUnique({
        where: {
          id: parseInt(id as string, 10),
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
