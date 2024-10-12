import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const jobs = await prisma.job.findMany();
    res.status(200).json(jobs);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
