const hre = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  console.log('Account balance:', (await deployer.getBalance()).toString());

  const Staking = await hre.ethers.getContractFactory('Staking');
  const xdcTokenAddress = '0x...'; // replace with XDCToken address
  const staking = await Staking.deploy(xdcTokenAddress);
  await staking.deployed();

  console.log('Staking contract deployed to:', staking.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
