const Sequelize = require("sequelize");

/**
 *  * ---------------------------- USER SEQUELIZE MODEL --------------------------------------
 * Schema/Model required for Sequelize to save user in database
 * This is used only for JWT Authentication Strategy
 * For Local strategy we use other schemas/models using Mongoose
 */
function userSequelizeModel(sequelize) {
  const userSequelizeModel = sequelize.define("user", {
    id: { type: Sequelize.STRING, primaryKey: true },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    salt: Sequelize.STRING,
  });
  return userSequelizeModel;
}

module.exports = { userSequelizeModel };
