const mongoose = require("mongoose");
const path = require("path");

const root = path.join(__dirname, "../");

require("dotenv").config();
const app = require(`${root}/app`);

const DB = process.env.DB.replace("<password>", process.env.DB_PASSWORD);

mongoose
   .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
   })
   .then(() => {
      console.log("Successfully connected the DB");
   })
   .catch((error) => console.error(error));

const port = process.env.PORT || 8080;

var server = app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`);
});

require(`${root}/api/socket-io/socket-server`)(server);
