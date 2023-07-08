/** @type import('hardhat/config').HardhatUserConfig */
require('@nomicfoundation/hardhat-toolbox');

module.exports = {
  solidity: '0.8.9',
  defaultNetwork: 'gnosis',
  networks: {
    scrollAlpha: {
      url: 'https://alpha-rpc.scroll.io/l2' || '',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
};
