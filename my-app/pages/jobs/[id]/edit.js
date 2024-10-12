import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditJob() {
  const router = useRouter();
  const { id } = router.query;

  const [job, setJob] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    async function fetchJob() {
      const response = await fetch(`/api/jobs/${id}`);
      const data = await response.json();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedJobData = {
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
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <button type="submit">Update Job</button>
      </form>
    </div>
  );
}
