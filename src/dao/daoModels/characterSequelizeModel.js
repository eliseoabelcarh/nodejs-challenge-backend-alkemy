const Sequelize = require("sequelize");

function characterSequelizeModel(sequelize) {
  /**
   * ---------------------- CHARACTER SEQUELIZE MODEL --------------------------------------
   * I Define model for doing later an association many-to-many between movie model and character model 
   */
  const characterSequelizeModel = sequelize.define("character", {
    id: { type: Sequelize.STRING, primaryKey: true },
    imagen: Sequelize.STRING,
    nombre: Sequelize.STRING,
    edad: Sequelize.INTEGER,
    peso: Sequelize.DECIMAL,
    historia: Sequelize.STRING,
  });
  return characterSequelizeModel;
}

module.exports = { characterSequelizeModel };
