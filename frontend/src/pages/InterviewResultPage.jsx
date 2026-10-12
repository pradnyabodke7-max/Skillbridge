import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

export default function InterviewResultPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get(`/interview/result/${id}`)
      .then((res) => setData(res.data))
      .catch(() => setError('Could not load the result.'));
  }, [id]);

  if (error) return <div className="page"><p className="message error">{error}</p></div>;
  if (!data) return <div className="page"><p className="message">Loading...</p></div>;

  const { result, questions } = data;

  return (
    <div className="page">
      <h1>Interview Result</h1>
      <div className="quiz-card">
        <p className="meta">{result.role} · {result.level}</p>
        <p className="score-label">Overall Score</p>
        <p className="score-big">{result.overallScore}/10</p>

        <div className="score-grid">
          <div className="score-box"><span>Technical</span><strong>{result.technical}/10</strong></div>
          <div className="score-box"><span>Communication</span><strong>{result.communication}/10</strong></div>
          <div className="score-box"><span>Accuracy</span><strong>{result.accuracy}/10</strong></div>
        </div>
        <p style={{ marginTop: 14 }}>{result.summary}</p>

        <h3 style={{ margin: '22px 0 10px' }}>Question review</h3>
        {questions.map((q, i) => (
          <div key={i} className="qa-item">
            <p><strong>Q{i + 1}. {q.text}</strong> <span className="skill-tag">{q.score}/10</span></p>
            <p className="meta">Your answer: {q.answerText}</p>
            <p className="meta">Feedback: {q.feedback}</p>
          </div>
        ))}

        <div className="quiz-nav">
          <Link className="btn" to="/interview">New Interview</Link>
        </div>
      </div>
    </div>
  );
}