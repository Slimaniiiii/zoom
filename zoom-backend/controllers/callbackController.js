const querystring = require("querystring");
const axios = require("axios");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = require("../config");

exports.callback = async (req, res) => {
  const { code } = req.query;

  const tokenParams = querystring.stringify({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
  });

  const headers = {
    Authorization: `Basic ${Buffer.from(
      `${CLIENT_ID}:${CLIENT_SECRET}`
    ).toString("base64")}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    const response = await axios.post(
      "https://zoom.us/oauth/token",
      tokenParams,
      { headers }
    );

    const { access_token, refresh_token } = response.data;

    // Store the tokens securely (e.g., in a database or session)
    // For simplicity, we'll store them in memory (not recommended for production)
    req.app.locals.accessToken = access_token;

    console.log("Access Token:", access_token);
    console.log("Refresh Token:", refresh_token);

    res.send("OAuth flow complete! Tokens received and stored.");
  } catch (error) {
    console.error(
      "Error exchanging authorization code for tokens:",
      error.message
    );
    res.status(500).send("Error occurred during OAuth flow");
  }
};
