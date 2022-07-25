const { createUserModel } = require("../models/userModel");

const storerNewUser = (function () {
  let instance;
  function create(dao) {
    return {
      save: async (data) => {
        const {username, password} = data
        console.log("EN storerNewUser:", {username, password});
        const newUser = createUserModel(data);
        console.log("NEW USER essssss:", newUser);
        return await dao.addUser(newUser);
      },
    };
  }
  return {
    getInstance: function (dao) {
      if (!instance) {
        instance = create(dao);
      }
      return instance;
    },
  };
})();

module.exports = storerNewUser;
