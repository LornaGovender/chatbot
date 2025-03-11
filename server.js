const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3001; // Ensure this port is not in conflict with your React app

app.use(bodyParser.json());

// Handle /api/completions route
app.post('/api/completions', async (req, res) => {
  try {
    const response = await axios.post('https://plt-aoai-test.openai.azure.com/v1/completions', req.body, {
      headers: {
        'Authorization': `Bearer ${process.env.AZURE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
