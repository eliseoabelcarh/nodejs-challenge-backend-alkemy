const removerFactory = require("./removerFactory");

/**
 * --------------------------------- REMOVER MODULE ENTRY POINT --------------------------------------- 
 * This module returns a REMOVER Object using a FACTORY PATTERN in REMOVERFactory file.
 * The REMOVER Object knows according his type REMOVE entire element and handle it according request.
 * 
 */
const crearRemover = () => {
  return {
    removeData: async ({ type, value }) => {
      let remover = removerFactory.getInstance(type);

      return await remover.remove(value);
    },
  };
};

module.exports = { crearRemover };
