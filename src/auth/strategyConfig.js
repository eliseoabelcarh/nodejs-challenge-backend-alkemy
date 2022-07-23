function getStrategyAuth() {
  /**
   * ---------------   Authentication Strategy ----------
   * OPTIONS YOU CAN CHOOSE: "jwt" or "local"
   * JWT: Uses JWT Passport Strategy define in src/auth/passport.js 
   * LOCAL: Uses Local Passport Strategy define in src/auth/passport.js 
   */
  const strategyAuth = "jwt";
  return strategyAuth;
}
module.exports = {
  getStrategyAuth,
};
