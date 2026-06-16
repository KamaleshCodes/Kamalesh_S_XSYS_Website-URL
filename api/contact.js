let lastSubmission = 0;

module.exports = function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};
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

  return res.status(200).json({ success: true, message: 'Received' });
};
