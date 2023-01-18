/* Setup environemnt variables using the .env file. */
const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.API_KEY; //API key for accessing the MeaningCloud API.

/* The base URL used for sending a request to the MeaningCloud Sentiment Analysis API */
const baseURL = `https:\/\/api.meaningcloud.com\/sentiment-2.1?key=${apiKey}&lang=en&url=`;

/* Middleware and dependencies for the application */
const bodyParser = require('body-parser'); //Used for parsing request bodies
const cors = require('cors');              //Used for enabling CORS requests
const express = require('express');        //Used for creating the server
const fetch = require('node-fetch');       //Used for implementing the Fetch API
const port = 80;                         //Port number for the server

/* Create an application instance and set the middleware. */
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

/* Point the application instance to the folder containing the webpage files. */
app.use(express.static('./dist'));

/* Start the local server. */
const server = app.listen(port, function() {
  console.log('MeaningCloud NLP App is running on http://localhost');
});

/*
 * Purpose: This function is used to make a request to
 * the MeaningCloud Sentiment Analysis API.
 *
 * Parameters:
 * - givenURL: A String representing the URL for a webpage.
 *
 * Return Value: An object containing the sentiment analysis data.
 */
async function getNLPData (givenURL) {
  const articleURL = givenURL;
  const apiResponse = await fetch(baseURL + articleURL); //Make a request to the API.

  /* Catch any errors that may occur while extracting the data. */
  try {
    const responseData = await apiResponse.json();
    return responseData;
  }
  catch(error) {
    console.log(`Error: ${error}`);
    return 0;
  }
}

/* POST route for client-side requests that need data from the MeaningCloud API */
app.post('/meaningCloud', function(req, res) {
  getNLPData(req.body.givenURL).then(function(NLPData) {

    /* If an error occurred while retrieving the data,
     * indicate that an internal server error occurred.
     * Otherwise, indicate a successful data retrieval.
     */
    if(NLPData === 0) {
      res.status = 500;
      res.json({message: 'An unexpected error occurred on the server.'});
    }
    else {
      res.status = 200;
      res.json(NLPData);
    }
  });
});
