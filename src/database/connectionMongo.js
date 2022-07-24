const mongoose = require("mongoose");
require("dotenv").config();

async function connectMongoose() {
  return new Promise((resolve, reject) => {
    try {
      mongoose.connect(process.env.CNX_STRING_MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      // mongoose.connection
      //   .on("open", () => console.log("The goose is open"))
      //   .on("close", () => console.log("The goose is closed"))
      //   .on("error", (error) => {
      //     console.log(error);
      //     process.exit();
      //   });
      resolve(mongoose);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { connectMongoose };
