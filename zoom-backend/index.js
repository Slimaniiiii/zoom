const express = require("express");
const app = express();
const cors = require("cors");
const { PORT } = require("./config");
app.use(cors());
app.use(express.json());


const authorizeController = require("./controllers/authorizeController.js");
const callbackController = require("./controllers/callbackController.js");
const meetingController = require("./controllers/meetingController.js");

//routes
app.get("/", (req, res) => {
  res.send("Welcome to Media Call System");
});

app.get("/authorize", authorizeController.authorize);

app.get("/callback", callbackController.callback);

app.get("/create-meeting", meetingController.createMeeting);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
