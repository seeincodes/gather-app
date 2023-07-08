import { Web3Button } from '@web3modal/react';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Web3Button />
    </>
  );
}
