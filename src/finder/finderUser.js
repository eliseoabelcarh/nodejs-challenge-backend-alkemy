/**
 * ------------------------------ FINDER USER ----------------------------------
 * This object knows how find USERS, using any parameter. 
 * This model is flexible to add more functions and behavior for this object
 * Pattern used: Singleton
 */
const finderUser = (function () {
  let instance;

  function create(dao) {
    return {
      searchByField: async ({ field, value }) => {
        if (field === "id") {
          return await dao.getUserById(value);
        }
        if (field === "username") {
          return await dao.getUserByUsername(value);
        }
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

module.exports = finderUser;
