import { Routes, Route, NavLink } from 'react-router-dom';
import JobsPage from './pages/JobsPage';
import AptitudePage from './pages/AptitudePage'; // NEW
import AptitudeResultPage from './pages/AptitudeResultPage'; // NEW

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
          <NavLink to="/aptitude">Aptitude</NavLink> {/* NEW */}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/aptitude" element={<AptitudePage />} /> {/* NEW */}
        <Route path="/aptitude/result" element={<AptitudeResultPage />} /> {/* NEW */}
      </Routes>
    </>
  );
}