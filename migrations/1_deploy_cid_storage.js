const CidStorage = artifacts.require("CidStorage");

module.exports = function(deployer) {
  deployer.deploy(CidStorage);
};