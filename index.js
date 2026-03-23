const express = require("express");
const connectDB = require("./config/connect");
const path = require("path");
const urlRoute = require("./routes/url");


const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", urlRoute);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
  });
});