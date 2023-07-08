import styles from '../styles/Endaoment.module.css';
import { Configuration, EndaomentSdkApi, NdaoSdkDonationSwap } from '@endaoment/sdk';
import { useState, useEffect } from 'react';
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi';

function Endaoment() {
  const [orgs, setOrgs] = useState([]);
  const [orgId, setOrgId] = useState('');
//   const [swapAndDonateTransaction, setSwapAndDonateTransaction] = useState();

  useEffect(() => {
    const fetchOrgs = async () => {
      const apiConfig = new Configuration({ network: "goerli" });
      const api = new EndaomentSdkApi(apiConfig);
      const fetchedOrgs = await api.getDeployedOrgs();
      setOrgs(fetchedOrgs);
      console.log(orgs.contractAddress);
      console.log(orgs);
    };

    fetchOrgs();
  }, []);

  const handleDonation = async () => {
    const apiConfig = new Configuration({ network: "goerli" });
    const api = new EndaomentSdkApi(apiConfig);
    console.log('orgId ', orgId);
    const donation = await api.getDonationSwapTransaction({'einOrId': orgId, amountIn: 1000000});
    console.log(donation);
  };

  return (
    <>
     <select onChange={(event) => setOrgId(event.target.value)}>
        {orgs.map((org, index) => (
            <option key={index} value={org.id}>
            {org.name}
            </option>
        ))}
        </select>

      <input ></input>
        <button onClick={handleDonation}>Send Donation</button>
    
    </>
  );
}

export default Endaoment;