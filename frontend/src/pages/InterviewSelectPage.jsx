import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const ROLES = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Analyst', 'AI/ML Engineer'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export default function InterviewSelectPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState(ROLES[0]);
  const [level, setLevel] = useState(LEVELS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const start = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/interview/start', { role, level });
      navigate('/interview/session', { state: res.data });
    } catch (err) {
      setError('Could not start the interview. Is the backend running?');
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Mock Interview</h1>
      <p>Choose a role and level. You will answer 5 questions and get a score for each.</p>
      <div className="toolbar">
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          {ROLES.map((r) => <option key={r}>{r}</option>)}
        </select>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          {LEVELS.map((l) => <option key={l}>{l}</option>)}
        </select>
        <button className="btn" onClick={start} disabled={loading}>
          {loading ? 'Starting...' : 'Start Interview'}
        </button>
      </div>
      {error && <p className="message error">{error}</p>}
    </div>
  );
}