const removerFactory = require("./removerFactory");

const crearRemover = () => {
  return {
    removeData: async ({ type, value }) => {
      let remover = removerFactory.getInstance(type);

      return await remover.remove(value);
    },
  };
};

module.exports = { crearRemover };
