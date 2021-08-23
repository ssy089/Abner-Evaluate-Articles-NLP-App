/*
 * Purpose: This function retrieves sentiment analysis data
 * for the given URL. This function makes a HTTP POST request
 * to the local server, which will get sentiment analysis data
 * for the given URL, and will return that data to this client-side
 * function.
 *
 * Parameters:
 * - pageURL: A string representing a URL.
 *
 * Return Value: An Object containing the sentiment analysis data.
 */
async function getSentimentAnalysis(pageURL) {

  /* Send a POST request to the server in order to easily send the URL. */
  const serverResponse = await fetch('http://localhost:8081/meaningCloud', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({givenURL: pageURL})
  });

  /* Ensure that any errors are caught, and determine
   * the proper return value.
   */
  try {
    /* If the server experienced any unexpected problems,
     * return 0. Otherwise, return the data.
     */
    if(serverResponse.status === 500) {
      return 0;
    }
    else {
      const responseData = await serverResponse.json();
      return responseData;
    }
  }
  /* Return 1 if an error occurred on the client side. */
  catch(error) {
    console.log(`Error: ${error}`);
    return 1;
  }
}

export { getSentimentAnalysis };

/*
 * Purpose: This function generates a sentiment analysis
 * of the webpage corresponding to the user's input,
 * and then displays that data.
 *
 * Parameters:
 * - submitEvent: A SubmitEvent object that is generated when the submit button is clicked.
 */
function analyzeWebpage(submitEvent) {
  submitEvent.preventDefault(); //Prevent the page from reloading.
 
  /* Remove any currently displayed error messages. */
  const errorMessages = document.querySelectorAll('.error');
  for(let errorMessage of errorMessages) {
    errorMessage.remove();
  }

  /* Get the Sentiment Information section's element and insert some placeholder text. */
  const sentimentInfo = document.querySelector('.sentiment-info');
  sentimentInfo.innerHTML = '<p>Here You Will See Key Points of the Sentiment Analysis!</p>';

  /* Get the user-provided URL, and verify that it is valid.
   * If it is not, display the proper error message. */
  const enteredURL = document.getElementById('enter-url');
  const validURL = Client.verifyEnteredURL(enteredURL.value);
  const textInput = document.querySelector('.text-input');
  if(validURL === false) {
    textInput.insertAdjacentHTML('afterend', '<p class="error">Please provide a properly formatted URL (e.g begins with https://).</p>');
    return;
  }

  /* Get the sentiment analysis data for the webpage corresponding to the URL. */
  getSentimentAnalysis(enteredURL.value).then(function(analysisData) {

    /* If there was an error on the local server, or if a sentiment analysis
     * could not be performed on the webpage corresponding to the given URL,
     * display the appropriate error message.
     */
    if(analysisData === 0) {
      textInput.insertAdjacentHTML('afterend', '<p class="error">Sorry, there was an unexpected error on the server.</p>');
      return;
    }
    else if(analysisData === 1) {
      textInput.insertAdjacentHTML('afterend', '<p class="error">Sorry, the request to the server could not be completed.</p>');
      return;
    }
    else if(analysisData.status.code === '212') {
      textInput.insertAdjacentHTML('afterend', '<p class="error">The given URL does not correspond to an existing webpage, or the given website is not recognized by the API.</p>');
      return;
    }

    /* Generate the HTML to display the basic aspects of the sentiment analysis data. */
    let polarityHTML = '';
    const polarityValue = analysisData.score_tag;
    switch (polarityValue) {
      case 'P+':
        polarityHTML = '<p><strong>Polarity:</strong> Strong Positive</p>';
	break;
      case 'P':
        polarityHTML = '<p><strong>Polarity:</strong> Positive</p>';
	break;
      case 'NEU':
        polarityHTML = '<p><strong>Polarity:</strong> Neutral</p>';
	break;
      case 'N':
        polarityHTML = '<p><strong>Polarity:</strong> Negative</p>';
	break;
      case 'N+':
        polarityHTML = '<p><strong>Polarity:</strong> Strong Negative</p>';
	break;
      case 'NONE':
        polarityHTML = '<p><strong>Polarity:</strong> None</p>';
	break;
    }
    const agreementValue = analysisData.agreement.charAt().toUpperCase() + analysisData.agreement.slice(1).toLowerCase();
    const agreementHTML = `<p><strong>Agreement:</strong> ${agreementValue}</p>`;
    const subjectivityValue = analysisData.subjectivity.charAt().toUpperCase() + analysisData.subjectivity.slice(1).toLowerCase();
    const subjectivityHTML = `<p><strong>Subjectivity:</strong> ${subjectivityValue}</p>`;
    const confidenceHTML = `<p><strong>Confidence of Analysis:</strong> ${analysisData.confidence}</p>`;
    const ironyValue = analysisData.irony.charAt().toUpperCase() + analysisData.irony.slice(1).toLowerCase();
    const ironyHTML = `<p><strong>Irony:</strong> ${ironyValue}</p>`;
    const urlHTML = `<p><strong>URL:</strong> ${enteredURL.value}</p>`;

    sentimentInfo.innerHTML = urlHTML + polarityHTML + agreementHTML + subjectivityHTML + confidenceHTML + ironyHTML;
  });
}

export { analyzeWebpage };
