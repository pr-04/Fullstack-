const express = require('express');
const os = require('os');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', host: os.hostname(), time: new Date().toISOString() });
});

app.get('/api/message', (req, res) => {
  res.json({
    message: 'Hello from backend instance',
    host: os.hostname(),
    envInstanceName: process.env.INSTANCE_NAME || null,
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port} — host=${os.hostname()}`);
});
