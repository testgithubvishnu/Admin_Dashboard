require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const authRouter = require("./router/auth-router");
const contactRouter = require("./router/contact-route");
const serviceRouter = require("./router/service-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

//Tackle cors :
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET , POST, PUT, DELETE, PATCH,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));
//const URI = process.env.Mongodb_URI;
//mongoose.connect(URI);

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use("/api/data", serviceRouter);

app.use(errorMiddleware);
connectDB().then(() => {
  const port = 5000;
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
