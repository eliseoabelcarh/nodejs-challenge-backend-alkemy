const mongoose = require("mongoose");
require("dotenv").config();

async function connectMongoose() {
  return new Promise((resolve, reject) => {
    try {
      mongoose.connect(process.env.CNX_STRING_MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      resolve(mongoose);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { connectMongoose };
