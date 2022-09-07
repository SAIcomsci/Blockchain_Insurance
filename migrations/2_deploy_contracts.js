const UserRegister = artifacts.require("UserRegister");

module.exports = function (deployer) {
  deployer.deploy(UserRegister);
};
