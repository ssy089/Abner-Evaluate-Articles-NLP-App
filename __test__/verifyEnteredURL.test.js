import { verifyEnteredURL } from '../src/client/js/verifyInput';

describe('Tests for the verifyEnteredURL Function', () => {
  test('Accept a Valid URL', () => {
    expect(verifyEnteredURL('https://www.bbc.com/news/uk-wales-58282975')).toBe(true);
  });

  test('Reject an Invalid URL that is Missing Format Components', () => {
    expect(verifyEnteredURL('www.bbc.com/news/uk-wales-58282975')).toBe(false);
  });

  test('Reject an Invalid URL that Has Format Components Misplaced', () => {
    expect(verifyEnteredURL('www.bbc.com/news/uk-wales-58282975https://')).toBe(false);
  });
});
