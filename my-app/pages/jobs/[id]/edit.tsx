import { useRouter } from 'next/router';
import { useEffect, useState, FormEvent } from 'react';
import React from 'react';


// Define the Job interface for typing the fetched data
interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
}

export default function EditJob() {
  const router = useRouter();
  const { id } = router.query;

  const [job, setJob] = useState<Job | null>(null); // Initialize job state with Job or null
  const [title, setTitle] = useState<string>(''); // Add string type for form fields
  const [description, setDescription] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string | null>(''); // Allow null for endDate

  useEffect(() => {
    async function fetchJob() {
      if (!id) return; // Ensure id exists before making the fetch call

      const response = await fetch(`/api/jobs/${id}`);
      const data: Job = await response.json();
      setJob(data);
      setTitle(data.title);
      setDescription(data.description);
      setCompany(data.company);
      setLocation(data.location);
      setStartDate(new Date(data.startDate).toISOString().split('T')[0]);
      setEndDate(data.endDate ? new Date(data.endDate).toISOString().split('T')[0] : '');
    }

    if (id) fetchJob();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const updatedJobData: Partial<Job> = {
      title,
      description,
      company,
      location,
      startDate,
      endDate,
    };

    try {
      const response = await fetch(`/api/jobs/${id}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedJobData),
      });

      if (response.ok) {
        router.push(`/jobs/${id}`);
      } else {
        console.error('Failed to update job');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Job: {job.title}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date (Optional)</label>
          <input
            type="date"
            value={endDate || ''}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit">Update Job</button>
      </form>
    </div>
  );
}
