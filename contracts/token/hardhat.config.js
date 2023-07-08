require('@nomicfoundation/hardhat-toolbox');

module.exports = {
  solidity: '0.8.9',
  defaultNetwork: 'gnosis',
  networks: {
    gnosis: {
      url: 'https://rpc.gnosischain.com/',
      gasPrice: 2000000000,
      accounts: [''],
    },
  },
};
