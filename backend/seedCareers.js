require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose');
const Career = require('./models/Career');

const careers = [
  {
    name: 'Full Stack Developer',
    description: 'Build complete web applications, from the user interface to the server and database.',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 'Git', 'REST API'],
    icon: 'Layers',
    color: '#fde7d6',
  },
  {
    name: 'Frontend Developer',
    description: 'Create fast, responsive and attractive user interfaces for websites and web apps.',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Git', 'Testing'],
    icon: 'Monitor',
    color: '#d9f5e8',
  },
  {
    name: 'Backend Developer',
    description: 'Design APIs, manage databases and keep the server side of applications secure and fast.',
    requiredSkills: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST API', 'SQL', 'Git'],
    icon: 'Server',
    color: '#e6e0fb',
  },
  {
    name: 'Data Analyst',
    description: 'Clean data, find patterns and present insights through reports and dashboards.',
    requiredSkills: ['Python', 'SQL', 'Excel', 'Data Visualization', 'Statistics', 'Pandas'],
    icon: 'BarChart3',
    color: '#dbeefc',
  },
  {
    name: 'AI/ML Engineer',
    description: 'Build, train and test machine learning models that solve real-world problems.',
    requiredSkills: ['Python', 'Machine Learning', 'Pandas', 'NumPy', 'Scikit-learn', 'Statistics', 'Deep Learning'],
    icon: 'Brain',
    color: '#fbe0ec',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await Career.deleteMany({});
    const inserted = await Career.insertMany(careers);
    console.log(`Inserted ${inserted.length} careers`);
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();