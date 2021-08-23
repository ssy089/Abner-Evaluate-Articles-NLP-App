require('jest-fetch-mock').enableMocks();
import { getSentimentAnalysis } from '../src/client/js/formHandler';
import regeneratorRuntime from 'regenerator-runtime'; //This module is used to provide a runtime for async functions.

describe('Test the getSentimentAnalysis Function', () => {

  test('Successfully Retrieve a Data Analysis', () => {
    fetch.mockResponseOnce(JSON.stringify({ code: {status: '0'} }));
    
    return getSentimentAnalysis('https://www.bbc.com/news/uk-wales-58282975').then(analysisData => {
      expect(analysisData.code.status).toBe('0');
    });
  });

  test('Return No Data for an Unrecognized Website', () => {
    fetch.mockResponseOnce(JSON.stringify({ code: {status: '212'} }));

    return getSentimentAnalysis('https://www.cbr.com/batman-89-most-wonderful-toy-batwing-restored/').then(analysisData => {
      expect(analysisData.code.status).toBe('212');
    });
  });
});
