require('@nomicfoundation/hardhat-toolbox');

module.exports = {
  solidity: '0.8.9',
  defaultNetwork: 'scroll',
  networks: {
    gnosis: {
      url: 'https://rpc.gnosischain.com/',
      gasPrice: 2000000000,
      accounts: [''],
    },
    scroll: {
      url: 'https://scroll-alphanet.public.blastapi.io' || '',
      accounts:
        [''],
    },
  },
};
