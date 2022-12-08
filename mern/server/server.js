// Authors: Joe Reiser (33%), Lauren Young (33%), Kavi Palmer (33%)

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/users"));
app.use(require("./routes/requests"));
app.use(require("./routes/events"));
app.use(require("./routes/nonprofits"));
app.use(require("./routes/organizations"));




// get driver connection
const dbo = require("./db/conn");
app.listen(port, async () => {
  // perform a database connection when server starts
  await dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});





