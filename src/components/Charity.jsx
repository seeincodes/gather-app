import styles from '../styles/Charity.module.css';
import { Configuration, EndaomentSdkApi } from '@endaoment/sdk';
import { useState, useEffect } from 'react';
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi';

function Charity() {
  const [orgs, setOrgs] = useState([]);
  const [ein, setEin] = useState('');

  useEffect(() => {
    const fetchOrgs = async () => {
      const apiConfig = new Configuration({ network: "goerli" });
      const api = new EndaomentSdkApi(apiConfig);
      const fetchedOrgs = await api.getDeployedOrgs();
      setOrgs(fetchedOrgs);
    };

    fetchOrgs();
  }, []);

  // const { config } = usePrepareSendTransaction({
  //   request: {
  //     to: swapAndDonateTransaction,
  //     data: swapAndDonateTransaction,
  //     value: swapAndDonateTransaction,
  //     gasLimit: 1_000_000,
  //   },
  //   enabled: !!swapAndDonateTransaction,
  //   onError: (error) => console.error(error),
  // });

  // const { sendTransaction } = useSendTransaction(configPrepareTxSwapAndDonate);

  const handleDonation = async () => {
    const apiConfig = new Configuration({ network: "goerli" });
    const api = new EndaomentSdkApi(apiConfig);
    const donation = await api.donateToOrg(ein, 1000000000000000000);
    console.log(donation);
  };

  return (
    <>
      <select>
        {orgs.map((org, index) => (
          <option key={index} value={org}>
            {org.name}
          </option>
        ))}
      </select>
      <input ></input>
        <button onClick={handleDonation}>Send Donation</button>
    
    </>
  );
}

export default Charity;
