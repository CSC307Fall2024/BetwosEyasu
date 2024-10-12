import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function JobDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState(null);

  useEffect(() => {
    async function fetchJob() {
      const response = await fetch(`/api/jobs/${id}`);
      const data = await response.json();
      setJob(data);
    }
    if (id) fetchJob();
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <p>{new Date(job.startDate).toLocaleDateString()} - {job.endDate ? new Date(job.endDate).toLocaleDateString() : 'Present'}</p>
      <p>Company: {job.company}</p>
      <p>Location: {job.location}</p>

      {/* Updated Link component without <a> tag */}
      <Link href={`/jobs/${id}/edit`}>
        Edit Job
      </Link>
    </div>
  );
}
