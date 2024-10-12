import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Define the Job interface
interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
}

export default function JobDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState<Job | null>(null); // Define the job state with Job type or null

  useEffect(() => {
    async function fetchJob() {
      if (!id) return; // Wait for id to be defined
      const response = await fetch(`/api/jobs/${id}`);
      const data: Job = await response.json();
      setJob(data);
    }
    if (id) fetchJob();
  }, [id]);

  if (!job) return <p>Loading...</p>; // Handle the loading state

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <p>{new Date(job.startDate).toLocaleDateString()} - {job.endDate ? new Date(job.endDate).toLocaleDateString() : 'Present'}</p>
      <p>Company: {job.company}</p>
      <p>Location: {job.location}</p>

      {/* Link to edit the job */}
      <Link href={`/jobs/${id}/edit`}>
        Edit Job
      </Link>
    </div>
  );
}
