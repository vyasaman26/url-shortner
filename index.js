const express = require("express");
const connectDB = require("./connect");

const urlRoute = require("./routes/url");

const app = express();

const PORT = 8001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/url", urlRoute);
connectDB()

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
