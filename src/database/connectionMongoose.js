const mongoose = require("mongoose");
require("dotenv").config();

/**
 * ----------------------------------- MONGO CONNECTION DATABASE------------------------------
 * configure database options, i will use it for users sessions with Local Authentication Strategy
 * For JWT Strategy ill use SequelizeUserDAO file
 */
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
