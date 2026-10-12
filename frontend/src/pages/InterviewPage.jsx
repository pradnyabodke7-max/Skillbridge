import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import api from '../api';

export default function InterviewPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(
    state ? { number: state.number, total: state.total, question: state.question } : null
  );
  const [answer, setAnswer] = useState('');
  const [reply, setReply] = useState(null); // full response after answering
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If the page is opened directly or refreshed, go back to the start
  if (!state) return <Navigate to="/interview" replace />;

  const submit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/interview/answer', {
        interviewId: state.interviewId,
        answer,
      });
      setReply(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not submit your answer.');
    } finally {
      setLoading(false);
    }
  };

  const goNext = () => {
    if (reply.finished) {
      navigate(`/interview/result/${reply.resultId}`);
      return;
    }
    setCurrent({ number: reply.number, total: reply.total, question: reply.question });
    setAnswer('');
    setReply(null);
  };

  const ev = reply?.evaluation;

  return (
    <div className="page">
      <h1>Mock Interview</h1>
      <div className="quiz-card">
        <div className="quiz-top">
          <span>Question {current.number}/{current.total}</span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${(current.number / current.total) * 100}%` }}
          />
        </div>

        <h3 className="quiz-question">{current.question}</h3>

        <textarea
          className="answer-box"
          rows={6}
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={!!reply}
        />

        {!reply && (
          <div className="quiz-nav">
            <span />
            <button className="btn" onClick={submit} disabled={loading || !answer.trim()}>
              {loading ? 'Evaluating...' : 'Submit Answer'}
            </button>
          </div>
        )}

        {ev && (
          <div className="feedback-box">
            <p className="score-label">Score</p>
            <p className="score-big">{ev.score}/10</p>
            <div className="score-grid">
              <div className="score-box"><span>Technical</span><strong>{ev.technical}/10</strong></div>
              <div className="score-box"><span>Communication</span><strong>{ev.communication}/10</strong></div>
              <div className="score-box"><span>Accuracy</span><strong>{ev.accuracy}/10</strong></div>
            </div>
            <p style={{ marginTop: 12 }}><strong>Feedback:</strong> {ev.feedback}</p>
            <div className="quiz-nav">
              <span />
              <button className="btn" onClick={goNext}>
                {reply.finished ? 'View Result' : 'Next Question'}
              </button>
            </div>
          </div>
        )}

        {error && <p className="message error">{error}</p>}
      </div>
    </div>
  );
}