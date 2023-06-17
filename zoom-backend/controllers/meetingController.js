const axios = require("axios");

exports.createMeeting = async (req, res) => {
  const { accessToken } = req.app.locals;
  if (!accessToken) {
    res
      .status(400)
      .send("Access token missing. Perform OAuth flow first.");
    return;
  }

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const meetingData = {
    topic: "Sample Meeting",
    type: 1,
    duration: 60,
    settings: {
      host_video: true,
      participant_video: true,
    },
  };

  try {
    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      meetingData,
      { headers }
    );

    console.log("Meeting created:", response.data);

    res.send("Zoom meeting created!");
  } catch (error) {
    console.error("Error creating Zoom meeting:", error.message);
    res.status(500).send("Error creating Zoom meeting");
  }
};
