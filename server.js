//import dotenv from 'dotenv';
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const UserModel = require("./model/UserModel")
//const { MONGO_URI } = require("./config/keys");
const dotenv = require("dotenv");
const Cryptr = require("cryptr");
dotenv.config();
var cron = require('node-cron');

// TODO:middleware
const url = "mongodb+srv://Afrasyab:Afra1234@lms.ljx4rbp.mongodb.net/?retryWrites=true&w=majority"
const cryptr = new Cryptr("5u8x/A?D(G+KbPeSgVkYp3s6v9y$B&E)");
app.use("/uploads", express.static("uploads"));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));

app.use(express.json());
app.use(cors());
//Routes

app.use("/auth", require("./routes/authRoute"));
app.use("/", require("./routes/courseRoute"));
app.use("/class",require("./routes/attendenceRoute"))
app.use("/users", require("./routes/userRoute"));
app.use("/profile", require("./routes/profileRoute"));
app.use("/enroll-course", require("./routes/enrollRoute"));
app.use("/fee", require("./routes/feeRoute"));

//Deploy:

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

cron.schedule('* * * * *', async () => {
  const date = new Date();
  console.log(date.getHours())
});

//Database and server created

const PORT = process.env.PORT || 5000;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected...");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Error occurred");
  });
