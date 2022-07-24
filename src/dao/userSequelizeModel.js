const Sequelize = require("sequelize");
const connectSequelize = require("../database/connectionSequelize");




async function userSequelizeModel() {
    
  //const sequelize = await (await connectionSequelize).getInstance()
  const seq = await connectSequelize
  const sequelize = await seq.getInstance()
  //Define model
  const userSequelizeModel = sequelize.define("users", {
    id: { type: Sequelize.STRING, primaryKey: true },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    salt: Sequelize.STRING,
  });
  //The call to userSequelizeModel.sync() above will cause Sequelize to synchronize the model with the database.
  await userSequelizeModel.sync();
  return userSequelizeModel;

}

module.exports = { userSequelizeModel };
