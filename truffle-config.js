module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,          // Cổng mặc định của Ganache GUI
      network_id: "5777",  // Mạng Ganache
      gas: 6721975,
      gasPrice: 20000000000 // 20 gwei
    }
  },
  compilers: {
    solc: {
      version: "0.8.20",   // Phiên bản Solidity khớp với contract
      settings: {
        optimizer: { enabled: true, runs: 200 },
        evmVersion: "paris" 
      }
    }
  },
  contracts_directory: "./contracts",
  contracts_build_directory: "./build/contracts"
};