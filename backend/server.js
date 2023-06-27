// 01.reqire core part..
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require('morgan');
// const cors = require('cors')
const productrouter = require('./src/routes/productRouter')
const userRouter = require('./src/routes/userRouter')
const orderRouter = require('./src/routes/orderRoutes')

require('colors')


// router from api

//02 config env file...
dotenv.config();

//01 create app..
const app = express();


// 03. Middlewares
app.use(express.json()); //use instead of  body parser
app.use(morgan("dev"));
// app.use(cors());

//for form data ( optional , don't need to use if you want):
app.use(express.urlencoded({extended:false}))

//=============================**** ROUTE CONNECTION ****===========================

//routing implement:
app.use("/api/v1", productrouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);

//undefined route implement:
app.use("*", (req, res) => {
  res.status(404).json({ status: "Route is not defined", data: "Not Found" });
});

// 02 listening server and connect with database ......
const PORT = process.env.RUNNING_PORT ;

// 02 create connect database..
mongoose.set("strictQuery", true);

let URI = "mongodb://localhost:27017/ProShop";
// let OPTION = { user: "", pass: "", autoIndex: true };
const dbConnection = async () => {
  try {
    mongoose.connect(URI, () => {
      console.log(`Connect to Mongodb database`.cyan.bold.italic.underline);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
  }
};

//02 listening server .......
app.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`.underline.yellow.italic.bold);
  dbConnection();
});

// export for seeder. If seeder not need then this code is unneccery
module.exports = dbConnection ;