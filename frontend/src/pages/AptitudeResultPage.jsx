import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import api from '../api';

export default function AptitudeResultPage() {
  const location = useLocation();
  const [result, setResult] = useState(location.state?.result || null);
  const [loading, setLoading] = useState(!location.state?.result);
  const [error, setError] = useState('');

  useEffect(() => {
    if (result) return;
    api
      .get('/aptitude/results')
      .then((res) => setResult(res.data[0] || null)) // newest first
      .catch(() => setError('Could not load your result.'))
      .finally(() => setLoading(false));
  }, [result]);

  if (loading) return <div className="page"><p className="message">Loading...</p></div>;
  if (error) return <div className="page"><p className="message error">{error}</p></div>;
  if (!result) {
    return (
      <div className="page">
        <p className="message">No results yet.</p>
        <Link className="btn" to="/aptitude">Take the test</Link>
      </div>
    );
  }

  const percent = Math.round((result.score / result.total) * 100);

  return (
    <div className="page">
      <h1>Aptitude Result</h1>

      <div className="quiz-card">
        <p className="score-label">Aptitude Score</p>
        <p className="score-big">
          {result.score}/{result.total}
        </p>
        <p className="meta">{percent}% overall</p>

        <h3 style={{ margin: '20px 0 10px' }}>Category breakdown</h3>
        {result.categoryScores.map((c) => (
          <div key={c.category} className="cat-row">
            <div className="cat-head">
              <span>{c.category}</span>
              <span>
                {c.percentage}% ({c.correct}/{c.total})
              </span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${c.percentage}%` }} />
            </div>
          </div>
        ))}

        <div className="quiz-nav">
          <Link className="btn" to="/aptitude">Retake Test</Link>
        </div>
      </div>
    </div>
  );
}