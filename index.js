const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();

const API_URL = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.5804163&lng=88.376133&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';

app.use(cors());

app.get('/api', async (req, res) => {
  try {
    console.log("Entered /api route");

    const response = await axios.get(API_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        // Add other headers if necessary
      }
    });

    console.log("API response status:", response.status);
    console.log("API response data:", response.data);

    res.json(response.data);
  } catch (error) {
    console.error("Error occurred:", error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({
      type: 'error',
      message: error.response ? error.response.data : error.message
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
