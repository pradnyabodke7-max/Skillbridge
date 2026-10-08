import { Routes, Route, NavLink } from 'react-router-dom';
import JobsPage from './pages/JobsPage';
import JobDetailsPage from './pages/JobDetailsPage';

function Home() {
  return (
    <div className="page">
      <h1>SkillBridge</h1>
      <p>AI-Based Career &amp; Skill Development Platform</p>
    </div>
  );
}

export default function App() {
  return (
    <>
      <nav className="navbar">
        <span className="brand">SkillBridge</span>
        <div className="links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
      </Routes>
    </>
  );
}