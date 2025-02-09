require('dotenv').config();
const express = require('express');
const cors = require('cors');
const isUrl = require('is-url');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use(express.urlencoded({
  extended: true
}));

// Api endpoints for shortener url
let url_arr = [];
app.post('/api/shorturl', (req, res) => {
  const url = req.body.url;
  if (!isUrl(url)) return res.json({ "error": "Invalid URL" });
  if (!url_arr.includes(url)) url_arr.push(url);
  res.json({ original_url: url, short_url: url_arr.indexOf(url) });
});

app.get('/api/shorturl/:text', (req, res) => {
  res.redirect(url_arr[req.params.text]);
});

// Listening
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
