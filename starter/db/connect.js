const mongoose = require("mongoose");


const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;

// .then(() => console.log("CONNECTED TO THE DB..."))
//   .catch((err) => console.log(err));
