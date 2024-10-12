import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';

interface JobData {
  title: string;
  description: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
}

export default function AddJob() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string | null>(''); // Allow null for no end date
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const jobData: JobData = {
      title,
      description,
      company,
      location,
      startDate,
      endDate: endDate ? endDate : null, // Set endDate to null if it's empty
    };

    try {
      const response = await fetch('/api/jobs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        router.push('/'); // Redirect to home page after successfully adding a job
      } else {
        console.error('Failed to add job');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Add a New Job</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Job Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Company</label>
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
        </div>
        <div>
          <label>Location</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div>
          <label>Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div>
          <label>End Date (Optional)</label>
          <input type="date" value={endDate || ''} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}
