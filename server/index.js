const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const {
  formatedUrl,
  getExistingShortUrlArray,
  getShortUrlId,
  getShortUrlEquiv,
  postShortUrlEquiv,
} = require('./utilsFunctions');

app.use(bodyParser.json());

app.post('/make', (req, res) => {
  const urlToShort = formatedUrl(req.body.url);
  const shortsUrlsEquivalences = getShortUrlEquiv();
  const shortURL = getShortUrlId(shortsUrlsEquivalences, urlToShort);

  if (!getExistingShortUrlArray(shortsUrlsEquivalences, urlToShort)) {
    postShortUrlEquiv(shortsUrlsEquivalences, shortURL, urlToShort);
  }
  res.status(201).send(`http://localhost:8080/${shortURL}`);
});

app.get('/:shortUrlId', (req, res) => {
  const id = req.params.shortUrlId;
  const shortsUrlsEquivalences = getShortUrlEquiv();
  const realUrl = shortsUrlsEquivalences[id];
  if (realUrl) {
    res.redirect(realUrl);
  } else {
    res.sendStatus(404);
  }
});

app.listen(8080, () => console.log('Server started'));
