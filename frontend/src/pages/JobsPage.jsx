import { useEffect, useState } from 'react';
import api from '../api';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/jobs')
      .then((res) => setJobs(res.data))
      .catch(() => setError('Could not load jobs. Is the backend running?'))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(jobs.map((j) => j.careerCategory))];
  const visibleJobs =
    category === 'All' ? jobs : jobs.filter((j) => j.careerCategory === category);

  return (
    <div className="page">
      <h1>Job Recommendations</h1>

      <div className="toolbar">
        <label htmlFor="category">Career category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="message">Loading jobs...</p>}
      {error && <p className="message error">{error}</p>}

      <div className="job-grid">
        {visibleJobs.map((job) => (
          <div className="job-card" key={job._id}>
            <h3>{job.title}</h3>
            <p className="company">{job.company}</p>
            <p className="meta">
              {job.location} • {job.jobType} • {job.experienceLevel}
            </p>
            <div className="skills">
              {job.requiredSkills.map((skill) => (
                <span className="skill-tag" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}