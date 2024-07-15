require("dotenv").config();
const express = require("express");
const app = express();
const authRouter = require("./router/auth-router");
const contactRouter = require("./router/contact-route");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
//const URI = process.env.Mongodb_URI;
//mongoose.connect(URI);

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);

app.use(errorMiddleware);
connectDB().then(() => {
  const port = 5000;
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
