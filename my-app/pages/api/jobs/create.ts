import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Add type for the job data in the request body
    const { title, description, company, location, startDate, endDate } = req.body as {
      title: string;
      description: string;
      company: string;
      location: string;
      startDate: string;
      endDate?: string | null;
    };

    try {
      const newJob = await prisma.job.create({
        data: {
          title,
          description,
          company,
          location,
          startDate: new Date(startDate),
          endDate: endDate ? new Date(endDate) : null, // Handle optional endDate
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
