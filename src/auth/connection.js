const mongoose = require("mongoose");
require("dotenv").config()


mongoose.connect(
  process.env.CNX_STRING_MONGO,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection
  .on("open", () => console.log("The goose is open"))
  .on("close", () => console.log("The goose is closed"))
  .on("error", (error) => {
    console.log(error);
    process.exit();
  });

module.exports = mongoose;
