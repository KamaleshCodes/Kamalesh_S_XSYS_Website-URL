const path = require('path');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
let lastSubmission = 0;

app.use(helmet());
app.use(compression());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/meta', (req, res) => {
  res.json({
    name: 'Kamalesh S',
    role: 'MBA Candidate @ XIMB | Ex-L&T | Mech Engineer',
    status: 'open_to_opportunities'
  });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message || !email.includes('@')) {
    return res.status(400).json({ success: false, error: 'Invalid fields' });
  }

  const now = Date.now();
  if (now - lastSubmission < 30000) {
    return res.status(429).json({ success: false, error: 'Please wait before sending another message' });
  }

  lastSubmission = now;
  console.log('Contact submission received:', {
    name,
    email,
    message,
    receivedAt: new Date().toISOString()
  });

  res.json({ success: true, message: 'Received' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
