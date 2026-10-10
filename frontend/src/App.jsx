import { Routes, Route, NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Target } from 'lucide-react';
import JobsPage from './pages/JobsPage';
import JobDetailsPage from './pages/JobDetailsPage';
import CareerGoalPage from './pages/CareerGoalPage';

// Teammates: add your own pages to this list and to <Routes> below
const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/careers', label: 'Career Goal', icon: Target, end: false },
  { to: '/jobs', label: 'Jobs', icon: Briefcase, end: false },
];

function Home() {
  return (
    <div className="page">
      <div className="hero">
        <h1>Welcome to SkillBridge</h1>
        <p>Find jobs that fit your skills and see exactly what to learn next.</p>
        <Link className="hero-btn" to="/careers">
          Choose your career goal
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-mark">S</span>
          <span className="logo-text">SkillBridge</span>
        </div>

        <nav className="side-nav">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className="side-link">
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="side-footer">AI Career &amp; Skill Platform</div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <span className="topbar-title">AI Career &amp; Skill Development Platform</span>
          <div className="avatar">S</div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/careers" element={<CareerGoalPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}