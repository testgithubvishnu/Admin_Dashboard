require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router/auth-router");
const connectDB = require("./utils/db");

//const URI = process.env.Mongodb_URI;
//mongoose.connect(URI);

app.use(express.json());

app.use("/api/auth", router);

connectDB().then(() => {
  const port = 5000;
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
