const { createUserModel } = require("../models/userModel");

/**
 * ------------------------------ STORER USER ----------------------------------
 * This object knows how STORE/SAVE USERS
 * This model is flexible to add more functions and behavior for this object
 * Pattern used: Singleton
 */
const storerNewUser = (function () {
  let instance;
  function create(dao) {
    return {
      save: async (data) => {
        const { username, password } = data
        const newUser = createUserModel(data);
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
