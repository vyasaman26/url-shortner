const express = require("express");
const connectDB = require("./config/connect");
const cookieParser = require("cookie-parser");
const {restrictToLoggedInUserOnly}=require('./middleware/auth')
const path = require("path");
const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRoute");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/",staticRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
  });
});
