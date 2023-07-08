import { ethers } from 'ethers';

export default async function stakeXDC() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const stakingContractABI = [
    // add the ABI from the  Staking contract
  ];

  // replace with the deployed staking contract address
  const stakingContractAddress = '0xYourStakingContractAddress';

  const stakingContract = new ethers.Contract(
    stakingContractAddress,
    stakingContractABI,
    signer
  );

  const stakeAmount = ethers.utils.parseUnits('1.0', 18);
  const account = await signer.getAddress();

  const xdcTokenContractABI = [
    // add the ABI from the XDCToken contract
  ];

  // replace with the deployed XDCToken contract address
  const xdcTokenContractAddress = '0xYourXDCTokenContractAddress';

  const xdcTokenContract = new ethers.Contract(
    xdcTokenContractAddress,
    xdcTokenContractABI,
    signer
  );

  let approveTx = await xdcTokenContract.approve(
    stakingContractAddress,
    stakeAmount
  );
  await approveTx.wait();

  let stakeTx = await stakingContract.stake(stakeAmount);
  await stakeTx.wait();

  alert('Successfully staked 1 XDC token!');
}
