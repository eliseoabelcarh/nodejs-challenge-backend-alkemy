const storerFactory = require("./storerFactory");

const crearStorer = () => {
  return {
    storeData: async ({ type, value }) => {
      let storer = storerFactory.getInstance(type);

      return await storer.save(value);
    },
  };
};

module.exports = { crearStorer };
