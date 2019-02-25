const {
  formatedUrl,
  getExistingShortUrlArray,
  getShortUrlId,
  getShortUrlEquiv,
  postShortUrlEquiv,
} = require('./utilsFunctions');

const fs = require('fs');
jest.mock('fs');

describe('formatedUrl', () => {
  test('Should return the correct url: www.google.com => http://www.google.com', () => {
    expect(formatedUrl('www.google.com')).toBe('http://www.google.com');
  });

  test('Should return the correct url: http://www.google.com => http://www.google.com', () => {
    expect(formatedUrl('http://www.google.com')).toBe('http://www.google.com');
  });

  test('Should return the correct url: https://www.google.com => https://www.google.com', () => {
    expect(formatedUrl('https://www.google.com')).toBe(
      'https://www.google.com'
    );
  });
});

describe('getExistingShortUrl', () => {
  test("Should return the correct array with { 1: 'www.google.com' } and 'www.google.com' ", () => {
    expect(
      getExistingShortUrlArray({ 1: 'www.google.com' }, 'www.google.com')
    ).toEqual(['1', 'www.google.com']);
  });

  test("Should return undefined with { 1: 'www.google.com' } and 'www.twitter.com'", () => {
    expect(
      getExistingShortUrlArray({ 1: 'www.google.com' }, 'www.twitter.com')
    ).toBeUndefined();
  });
});

describe('getShortUrlId', () => {
  test('Should return the correct id if url exist in the object', () => {
    expect(getShortUrlId({ 1: 'www.google.com' }, 'www.google.com')).toBe('1');
  });

  test("Date.now() should be called if url doesn't exist in the object", () => {
    const spyDate = jest.spyOn(Date, 'now');
    getShortUrlId({ 1: 'www.google.com' }, 'www.twitter.com');
    expect(spyDate).toBeCalled();
  });

  test("Should return the Date.now() result if url doesn't exist in the object", () => {
    Date.now = jest.fn(() => 123);
    expect(getShortUrlId({ 1: 'www.google.com' }, 'www.twitter.com')).toBe(
      '123'
    );
  });
});

describe('getShortUrlEquiv', () => {
  beforeEach(
    () =>
      (fs.readFileSync = jest.fn(() =>
        JSON.stringify({ '123': 'https://www.google.com' })
      ))
  );
  afterEach(() => fs.readFileSync.mockRestore());

  test('fs.readFileSync should to be called', () => {
    const spyReadFile = jest.spyOn(fs, 'readFileSync');
    getShortUrlEquiv();
    expect(spyReadFile).toBeCalled;
  });

  test('Should return the correct datas', () => {
    expect(getShortUrlEquiv()).toEqual({
      '123': 'https://www.google.com',
    });
  });
});

describe('postShortUrlEquiv', () => {
  const fsWriteMock = jest.fn(() => null);

  beforeEach(() => (fs.writeFileSync = fsWriteMock));
  afterEach(() => fs.writeFileSync.mockRestore());

  test('fs.writeFileSync should to be called', () => {
    postShortUrlEquiv(
      { '123': 'https://www.google.com' },
      '456',
      'www.twitter.com'
    );
    expect(fsWriteMock).toHaveBeenCalled();
  });

  test('fs.writeFileSync should to be called with correct datas', () => {
    postShortUrlEquiv(
      { '123': 'https://www.google.com' },
      '456',
      'www.twitter.com'
    );
    expect(fsWriteMock).toBeCalledWith(
      './shortUrlEquivalence.json',
      JSON.stringify({
        '123': 'https://www.google.com',
        '456': 'www.twitter.com',
      })
    );
  });
});
