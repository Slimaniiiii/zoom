const querystring = require("querystring");
const { CLIENT_ID, REDIRECT_URI } = require("../config");

exports.authorize = (req, res) => {
  const params = querystring.stringify({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: "meeting:write",
  });
  res.redirect(`https://zoom.us/oauth/authorize?${params}`);
};
