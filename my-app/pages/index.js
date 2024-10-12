import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [jobs, setJobs] = useState([]);

  // Fetch jobs from the API and sort them by most recent first
  useEffect(() => {
    async function fetchJobs() {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      // Sort jobs by endDate (most recent first)
      const sortedJobs = data.sort((a, b) => {
        const endDateA = a.endDate ? new Date(a.endDate) : new Date();
        const endDateB = b.endDate ? new Date(b.endDate) : new Date();
        return endDateB - endDateA;
      });
      setJobs(sortedJobs);
    }
    fetchJobs();
  }, []);

  return (
    <div>
      <h1>My Resume</h1>

      {/* Contact Information */}
      <div>
        <h2>Contact Information</h2>
        <p>Name: Eyasu Hankore Betwos</p>
        <p>Email: ebetwos@calpoly.edu</p>
        <p>Phone: (559) 374-4936</p>
      </div>

      {/* Projects */}
      <div>
        <h2>Projects</h2>
        <ul>
          <li><strong>Project 1:</strong> AI-Based Family Tree Interaction App</li>
          <li><strong>Project 2:</strong> Avocado Sales Analysis Dashboard</li>
          <li><strong>Project 3:</strong> Lego Data Manipulation Tool</li>
        </ul>
      </div>

      {/* Skills */}
      <div>
        <h2>Skills</h2>
        <ul>
          <li>JavaScript</li>
          <li>React</li>
          <li>C/C++</li>
          <li>Python</li>
          <li>Data Analysis (Pandas, Numpy)</li>
          <li>SQL</li>
        </ul>
      </div>

      {/* Add Job Button */}
      <div style={{ marginBottom: '20px' }}>
        <Link href="/jobs/new">
          <button style={{ padding: '10px 20px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px' }}>
            Add New Job
          </button>
        </Link>
      </div>

      {/* Jobs in Reverse Chronological Order */}
      {jobs.length ? (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <Link href={`/jobs/${job.id}`}>
                {job.title} at {job.company} <br />
                {new Date(job.startDate).toLocaleDateString()} - {job.endDate ? new Date(job.endDate).toLocaleDateString() : 'Present'}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs to display</p>
      )}
    </div>
  );
}
