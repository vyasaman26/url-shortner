const express = require("express");
const connectDB = require("./config/connect");

const urlRoute = require("./routes/url");
const URL = require("./models/url");
const app = express();

const PORT = 8001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", urlRoute);

connectDB();

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
