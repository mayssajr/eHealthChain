const authentification = artifacts.require("authentification");

module.exports = function (deployer) {
  deployer.deploy(authentification);
};
