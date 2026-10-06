require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose');
const Job = require('./models/Job');

const jobs = [
  {
    title: 'Junior React Developer',
    company: 'BrightApps Technologies',
    location: 'Pune',
    jobType: 'Full-time',
    experienceLevel: 'Beginner',
    careerCategory: 'Frontend Developer',
    description: 'Build responsive user interfaces using React and work with REST APIs.',
    requiredSkills: ['React', 'JavaScript', 'HTML', 'CSS', 'Git'],
  },
  {
    title: 'Frontend Developer',
    company: 'PixelCraft Solutions',
    location: 'Bengaluru',
    jobType: 'Full-time',
    experienceLevel: 'Intermediate',
    careerCategory: 'Frontend Developer',
    description: 'Develop and maintain web apps with a focus on performance and UI quality.',
    requiredSkills: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Testing'],
  },
  {
    title: 'Full Stack Developer Intern',
    company: 'CodeNest Labs',
    location: 'Remote',
    jobType: 'Internship',
    experienceLevel: 'Beginner',
    careerCategory: 'Full Stack Developer',
    description: 'Work on both frontend and backend features of a MERN stack product.',
    requiredSkills: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript'],
  },
  {
    title: 'Full Stack Developer',
    company: 'StackWorks India',
    location: 'Mumbai',
    jobType: 'Full-time',
    experienceLevel: 'Intermediate',
    careerCategory: 'Full Stack Developer',
    description: 'Design APIs, build UI screens and manage databases for web applications.',
    requiredSkills: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Git', 'REST API'],
  },
  {
    title: 'Backend Developer',
    company: 'ServerLogic Pvt Ltd',
    location: 'Hyderabad',
    jobType: 'Full-time',
    experienceLevel: 'Intermediate',
    careerCategory: 'Backend Developer',
    description: 'Build secure and scalable APIs and manage database operations.',
    requiredSkills: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST API'],
  },
  {
    title: 'Data Analyst Trainee',
    company: 'InsightEdge Analytics',
    location: 'Pune',
    jobType: 'Full-time',
    experienceLevel: 'Beginner',
    careerCategory: 'Data Analyst',
    description: 'Clean data, create reports and build dashboards for business teams.',
    requiredSkills: ['Python', 'SQL', 'Excel', 'Data Visualization', 'Statistics'],
  },
  {
    title: 'Junior AI/ML Engineer',
    company: 'NeuralPath AI',
    location: 'Remote',
    jobType: 'Full-time',
    experienceLevel: 'Beginner',
    careerCategory: 'AI/ML Engineer',
    description: 'Train and test machine learning models and prepare datasets.',
    requiredSkills: ['Python', 'Machine Learning', 'Pandas', 'NumPy', 'Scikit-learn'],
  },
  {
    title: 'Python Backend Intern',
    company: 'DataBridge Systems',
    location: 'Remote',
    jobType: 'Internship',
    experienceLevel: 'Beginner',
    careerCategory: 'Backend Developer',
    description: 'Assist in building Python APIs and database integrations.',
    requiredSkills: ['Python', 'SQL', 'REST API', 'Git'],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await Job.deleteMany({});
    const inserted = await Job.insertMany(jobs);
    console.log(`Inserted ${inserted.length} sample jobs`);
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();