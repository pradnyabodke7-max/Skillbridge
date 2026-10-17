require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose');
const Career = require('./models/Career');
const Roadmap = require('./models/Roadmap');

// What to learn for each skill (official docs / free courses)
const library = {
  HTML: { weeks: 1, description: 'Learn page structure: headings, forms, tables and semantic tags.', title: 'MDN HTML guide', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  CSS: { weeks: 2, description: 'Style pages with selectors, flexbox, grid and responsive design.', title: 'MDN CSS guide', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  JavaScript: { weeks: 4, description: 'Variables, functions, arrays, DOM, async code and ES6 features.', title: 'MDN JavaScript guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  Git: { weeks: 1, description: 'Track your code with commits, branches and pull requests on GitHub.', title: 'Git documentation', url: 'https://git-scm.com/doc' },
  React: { weeks: 4, description: 'Build UIs with components, props, state, hooks and routing.', title: 'React official tutorial', url: 'https://react.dev/learn' },
  'Tailwind CSS': { weeks: 1, description: 'Style quickly with utility classes and build responsive layouts.', title: 'Tailwind CSS docs', url: 'https://tailwindcss.com/docs' },
  Testing: { weeks: 2, description: 'Write unit tests for your code and components with Jest.', title: 'Jest getting started', url: 'https://jestjs.io/docs/getting-started' },
  'Node.js': { weeks: 3, description: 'Run JavaScript on the server, work with modules, files and npm.', title: 'Node.js learn', url: 'https://nodejs.org/en/learn' },
  'Express.js': { weeks: 2, description: 'Create servers, routes and middleware for your APIs.', title: 'Express.js guide', url: 'https://expressjs.com/' },
  MongoDB: { weeks: 2, description: 'Store data in collections, query it and model it with Mongoose.', title: 'MongoDB University', url: 'https://learn.mongodb.com/' },
  'REST API': { weeks: 1, description: 'Design clean endpoints, use HTTP methods and return correct status codes.', title: 'REST API tutorial', url: 'https://restfulapi.net/' },
  JWT: { weeks: 1, description: 'Secure your APIs with token-based login and protected routes.', title: 'JWT introduction', url: 'https://jwt.io/introduction' },
  SQL: { weeks: 3, description: 'Query relational data with SELECT, JOIN, GROUP BY and subqueries.', title: 'SQL tutorial', url: 'https://www.w3schools.com/sql/' },
  Python: { weeks: 4, description: 'Learn syntax, data structures, functions and file handling.', title: 'Python tutorial', url: 'https://docs.python.org/3/tutorial/' },
  Excel: { weeks: 2, description: 'Use formulas, pivot tables and charts to analyse data.', title: 'Microsoft Excel help', url: 'https://support.microsoft.com/excel' },
  Pandas: { weeks: 2, description: 'Clean, filter and summarise tables of data in Python.', title: 'Pandas getting started', url: 'https://pandas.pydata.org/docs/getting_started/index.html' },
  NumPy: { weeks: 1, description: 'Work with arrays and fast numerical operations.', title: 'NumPy for beginners', url: 'https://numpy.org/doc/stable/user/absolute_beginners.html' },
  Statistics: { weeks: 3, description: 'Mean, variance, probability, distributions and hypothesis tests.', title: 'Khan Academy statistics', url: 'https://www.khanacademy.org/math/statistics-probability' },
  'Data Visualization': { weeks: 2, description: 'Turn data into clear charts and dashboards.', title: 'Matplotlib tutorials', url: 'https://matplotlib.org/stable/tutorials/index.html' },
  'Machine Learning': { weeks: 4, description: 'Train and evaluate models for prediction and classification.', title: 'Kaggle: Intro to ML', url: 'https://www.kaggle.com/learn/intro-to-machine-learning' },
  'Scikit-learn': { weeks: 2, description: 'Build ML pipelines with ready-made algorithms.', title: 'Scikit-learn getting started', url: 'https://scikit-learn.org/stable/getting_started.html' },
  'Deep Learning': { weeks: 4, description: 'Understand neural networks and train your first deep models.', title: 'Kaggle: Intro to Deep Learning', url: 'https://www.kaggle.com/learn/intro-to-deep-learning' },
};

// Learning order for each career (must match the career names in the database)
const orders = {
  'Full Stack Developer': ['HTML', 'CSS', 'JavaScript', 'Git', 'React', 'Node.js', 'Express.js', 'MongoDB', 'REST API'],
  'Frontend Developer': ['HTML', 'CSS', 'JavaScript', 'Git', 'React', 'Tailwind CSS', 'Testing'],
  'Backend Developer': ['Git', 'Node.js', 'Express.js', 'REST API', 'MongoDB', 'SQL', 'JWT'],
  'Data Analyst': ['Python', 'SQL', 'Excel', 'Pandas', 'Statistics', 'Data Visualization'],
  'AI/ML Engineer': ['Python', 'NumPy', 'Pandas', 'Statistics', 'Machine Learning', 'Scikit-learn', 'Deep Learning'],
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const careers = await Career.find();
    if (careers.length === 0) {
      console.log('No careers found. Run: node seedCareers.js first');
      return;
    }

    const docs = [];
    for (const career of careers) {
      const skillOrder = orders[career.name];
      if (!skillOrder) {
        console.log(`No roadmap order for: ${career.name}`);
        continue;
      }

      const steps = skillOrder.map((skill, i) => {
        const info = library[skill];
        return {
          order: i + 1,
          skill,
          description: info.description,
          weeks: info.weeks,
          resourceTitle: info.title,
          resourceUrl: info.url,
        };
      });

      docs.push({ career: career._id, careerName: career.name, steps });
    }

    await Roadmap.deleteMany({});
    const inserted = await Roadmap.insertMany(docs);
    console.log(`Inserted ${inserted.length} roadmaps`);
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();