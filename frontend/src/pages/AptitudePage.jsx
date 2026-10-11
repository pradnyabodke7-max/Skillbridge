import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const CATEGORIES = ['All', 'Logical', 'Quantitative', 'Verbal', 'Technical'];
const LETTERS = ['A', 'B', 'C', 'D'];

export default function AptitudePage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('All');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { questionId: selectedIndex }
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const startTest = async () => {
    setLoading(true);
    setError('');
    try {
      const params = category === 'All' ? {} : { category };
      const res = await api.get('/aptitude/questions', { params });
      setQuestions(res.data);
      setAnswers({});
      setCurrent(0);
      setStarted(true);
    } catch (err) {
      setError('Could not load questions. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const submitTest = async () => {
    setLoading(true);
    setError('');
    try {
      const payload = questions.map((q) => ({
        questionId: q._id,
        selectedIndex: answers[q._id],
      }));
      const res = await api.post('/aptitude/submit', { answers: payload });
      navigate('/aptitude/result', { state: { result: res.data } });
    } catch (err) {
      setError('Could not submit the test. Please try again.');
      setLoading(false);
    }
  };

  // ---------- Start screen ----------
  if (!started) {
    return (
      <div className="page">
        <h1>Aptitude Assessment</h1>
        <p>Choose a category and test yourself.</p>
        <div className="toolbar">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All categories (20 questions)' : c}
              </option>
            ))}
          </select>
          <button className="btn" onClick={startTest} disabled={loading}>
            {loading ? 'Loading...' : 'Start Test'}
          </button>
        </div>
        {error && <p className="message error">{error}</p>}
      </div>
    );
  }

  // ---------- Question screen ----------
  const q = questions[current];
  const answeredCount = Object.keys(answers).length;
  const isLast = current === questions.length - 1;

  return (
    <div className="page">
      <h1>Aptitude Assessment</h1>
      <div className="quiz-card">
        <div className="quiz-top">
          <span>
            Question {current + 1}/{questions.length}
          </span>
          <span className="skill-tag">{q.category}</span>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>

        <h3 className="quiz-question">{q.question}</h3>

        <div className="options">
          {q.options.map((opt, i) => (
            <button
              key={i}
              className={`option ${answers[q._id] === i ? 'selected' : ''}`}
              onClick={() => setAnswers({ ...answers, [q._id]: i })}
            >
              <strong>{LETTERS[i]})</strong> {opt}
            </button>
          ))}
        </div>

        <div className="quiz-nav">
          <button
            className="btn btn-secondary"
            onClick={() => setCurrent(current - 1)}
            disabled={current === 0}
          >
            Previous
          </button>

          {isLast ? (
            <button
              className="btn"
              onClick={submitTest}
              disabled={loading || answeredCount < questions.length}
            >
              {loading ? 'Submitting...' : 'Submit Test'}
            </button>
          ) : (
            <button className="btn" onClick={() => setCurrent(current + 1)}>
              Next
            </button>
          )}
        </div>

        <p className="message">
          Answered {answeredCount} of {questions.length}
          {isLast && answeredCount < questions.length && ' (answer all questions to submit)'}
        </p>
        {error && <p className="message error">{error}</p>}
      </div>
    </div>
  );
}