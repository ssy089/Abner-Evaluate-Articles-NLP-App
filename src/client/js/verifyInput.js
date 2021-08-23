/*
 * Purpose: This function verifies that the user-provided input
 * is a valid URL.
 *
 * Parameters:
 * - someURL: This is a String representing the URL that the user provided.
 *
 * Return Value: A boolean value indicating whether the URL is valid.
 */
function verifyEnteredURL(someURL) {
  let givenURL = ''; //Assign the parameter to a local variable.
  givenURL = someURL;

  /* Create a regular expression that ensures that
   * the user-provided URL includes the HTTP(S) protocol
   * (i.e. the URL begins with https:// or http:// ).
   */
  const re = new RegExp('^https?:\/\/', 'i');
  const matchExists = re.test(givenURL); //Check if the URL matches the RegExp.
  if(matchExists !== false) {
    return true;
  }
  else {
    return false;
  }
}

export { verifyEnteredURL };
