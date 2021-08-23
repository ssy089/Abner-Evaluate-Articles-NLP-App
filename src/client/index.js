/* Import the client-side code. */
import { verifyEnteredURL } from './js/verifyInput';
import { getSentimentAnalysis } from './js/formHandler';
import { analyzeWebpage } from './js/formHandler';
import regeneratorRuntime from 'regenerator-runtime'; //This module is used to provide a runtime for async functions.

/* Import the styling files. */
import './styles/base.scss';
import './styles/main.scss';
import './styles/header.scss';
import './styles/form.scss';
import './styles/footer.scss';

/* Import the images. */
import LogoMeaningCloud650x264 from './img/LogoMeaningCloud650x264.png';

/* Add an event listener for the submit button. */
document.getElementById('analyze').addEventListener('click', analyzeWebpage);

/* Export the client-side code to Webpack's output library. */
export {
  regeneratorRuntime,
  verifyEnteredURL,
  getSentimentAnalysis,
  analyzeWebpage
};
