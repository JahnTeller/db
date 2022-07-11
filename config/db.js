const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
//const URL = "mongodb+srv://hnam:E95vIaIXtCZ87mUD@cluster0.hq1fa.mongodb.net/?retryWrites=true&w=majority";
const URL = "mongodb://localhost:27017/svmdss-database"
const connect = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.LOCAL_URL || URL,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
      () => {
        console.log("Connect successfully");
      }
    );
  } catch (error) {
    console.log(`Error ${error}`);
  }
};

module.exports = connect;
