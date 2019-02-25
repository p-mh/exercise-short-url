const fs = require('fs');

const formatedUrl = url =>
  url.match(/https:\/\/|http:\/\//) ? url : `http://${url}`;

const getExistingShortUrlArray = (contentToCheck, urlToShort) =>
  Object.entries(contentToCheck).find(
    shortUrlGroup => shortUrlGroup[1] === urlToShort
  );

const getShortUrlId = (contentToCheck, urlToShort) => {
  const existingShortUrl = getExistingShortUrlArray(contentToCheck, urlToShort);
  if (existingShortUrl) {
    return existingShortUrl[0];
  }
  return Date.now().toString();
};

const getShortUrlEquiv = () =>
  JSON.parse(fs.readFileSync('./shortUrlEquivalence.json', 'utf-8'));

const postShortUrlEquiv = (prevShortObject, shortURL, urlToShort) => {
  fs.writeFileSync(
    './shortUrlEquivalence.json',
    JSON.stringify({
      ...prevShortObject,
      [shortURL]: urlToShort,
    })
  );
};

module.exports = {
  formatedUrl,
  getExistingShortUrlArray,
  getShortUrlId,
  getShortUrlEquiv,
  postShortUrlEquiv,
};
