require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose');
const AptitudeQuestion = require('./models/AptitudeQuestion');

const questions = [
  // ---------- TECHNICAL ----------
  {
    category: 'Technical',
    question: 'What is the output of console.log(2 + "2");',
    options: ['4', '22', 'Error', 'undefined'],
    correctIndex: 1,
    explanation: 'The number 2 is converted to a string, so + joins them.',
  },
  {
    category: 'Technical',
    question: 'Which HTML tag is used to create a hyperlink?',
    options: ['<link>', '<a>', '<href>', '<url>'],
    correctIndex: 1,
    explanation: 'The <a> (anchor) tag creates hyperlinks.',
  },
  {
    category: 'Technical',
    question: 'Which hook is used to manage state in a React function component?',
    options: ['useEffect', 'useRef', 'useState', 'useMemo'],
    correctIndex: 2,
    explanation: 'useState lets a function component hold state.',
  },
  {
    category: 'Technical',
    question: 'Which database is used in the MERN stack?',
    options: ['MySQL', 'MongoDB', 'PostgreSQL', 'Oracle'],
    correctIndex: 1,
    explanation: 'The M in MERN stands for MongoDB.',
  },
  {
    category: 'Technical',
    question: 'Which HTTP method is normally used to create a new resource?',
    options: ['GET', 'DELETE', 'POST', 'HEAD'],
    correctIndex: 2,
    explanation: 'POST is used to create new data on the server.',
  },

  // ---------- LOGICAL ----------
  {
    category: 'Logical',
    question: 'Find the next number: 2, 4, 8, 16, ?',
    options: ['24', '30', '32', '64'],
    correctIndex: 2,
    explanation: 'Each number is doubled.',
  },
  {
    category: 'Logical',
    question: 'Find the next number: 3, 6, 9, 12, ?',
    options: ['14', '15', '16', '18'],
    correctIndex: 1,
    explanation: 'Each number increases by 3.',
  },
  {
    category: 'Logical',
    question: 'If all roses are flowers and some flowers fade quickly, which statement must be true?',
    options: [
      'All roses fade quickly',
      'Some roses are flowers',
      'No rose fades',
      'All flowers are roses',
    ],
    correctIndex: 1,
    explanation: 'All roses are flowers, so some roses are definitely flowers.',
  },
  {
    category: 'Logical',
    question: 'Which one is the odd one out: Apple, Mango, Carrot, Banana?',
    options: ['Apple', 'Mango', 'Carrot', 'Banana'],
    correctIndex: 2,
    explanation: 'Carrot is a vegetable; the others are fruits.',
  },
  {
    category: 'Logical',
    question: 'If A = 1, B = 2, C = 3, what is the value of CAB?',
    options: ['312', '321', '123', '132'],
    correctIndex: 0,
    explanation: 'C = 3, A = 1, B = 2, so CAB = 312.',
  },

  // ---------- QUANTITATIVE ----------
  {
    category: 'Quantitative',
    question: 'What is 15% of 200?',
    options: ['20', '25', '30', '35'],
    correctIndex: 2,
    explanation: '200 x 15 / 100 = 30.',
  },
  {
    category: 'Quantitative',
    question: 'A train travels 120 km in 2 hours. What is its speed?',
    options: ['40 km/h', '50 km/h', '60 km/h', '70 km/h'],
    correctIndex: 2,
    explanation: 'Speed = distance / time = 120 / 2 = 60 km/h.',
  },
  {
    category: 'Quantitative',
    question: 'What is the average of 10, 20, 30, 40, 50?',
    options: ['25', '30', '35', '40'],
    correctIndex: 1,
    explanation: 'Sum is 150, and 150 / 5 = 30.',
  },
  {
    category: 'Quantitative',
    question: 'If 5 pens cost Rs 50, how much do 8 pens cost?',
    options: ['Rs 70', 'Rs 75', 'Rs 80', 'Rs 85'],
    correctIndex: 2,
    explanation: 'One pen costs Rs 10, so 8 pens cost Rs 80.',
  },
  {
    category: 'Quantitative',
    question: 'What is the square root of 144?',
    options: ['10', '11', '12', '14'],
    correctIndex: 2,
    explanation: '12 x 12 = 144.',
  },

  // ---------- VERBAL ----------
  {
    category: 'Verbal',
    question: "Choose the synonym of 'Rapid':",
    options: ['Slow', 'Quick', 'Weak', 'Calm'],
    correctIndex: 1,
    explanation: 'Rapid means quick.',
  },
  {
    category: 'Verbal',
    question: "Choose the antonym of 'Ancient':",
    options: ['Old', 'Modern', 'Historic', 'Aged'],
    correctIndex: 1,
    explanation: 'Modern is the opposite of ancient.',
  },
  {
    category: 'Verbal',
    question: 'Choose the correct sentence:',
    options: [
      'She go to school daily.',
      'She goes to school daily.',
      'She going to school daily.',
      'She gone to school daily.',
    ],
    correctIndex: 1,
    explanation: 'With "she", the verb takes -es: goes.',
  },
  {
    category: 'Verbal',
    question: "Fill in the blank: He is good ___ mathematics.",
    options: ['in', 'at', 'on', 'for'],
    correctIndex: 1,
    explanation: 'The correct phrase is "good at".',
  },
  {
    category: 'Verbal',
    question: "Choose the correctly spelled word:",
    options: ['Recieve', 'Receive', 'Receeve', 'Receve'],
    correctIndex: 1,
    explanation: 'Correct spelling: receive (i before e, except after c).',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await AptitudeQuestion.deleteMany({});
    const inserted = await AptitudeQuestion.insertMany(questions);
    console.log(`Inserted ${inserted.length} aptitude questions`);
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();