const storerFactory = require("./storerFactory");

/**
 * --------------------------------- STORER MODULE ENTRY POINT --------------------------------------- 
 * This module returns a STORER Object using a FACTORY PATTERN in STORERFactory file.
 * The STORER Object knows according his type SAVE/STORE/PERSIST an element and handle it according request.
 * 
 */
const crearStorer = () => {
  return {
    storeData: async ({ type, value }) => {
      let storer = storerFactory.getInstance(type);

      return await storer.save(value);
    },
  };
};

module.exports = { crearStorer };
