import axios from 'axios';

export const createShortUrl = async urlToShort => {
  const { data } = await axios.post('/make', { url: urlToShort });
  return data;
};
