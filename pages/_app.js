import '/styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import '@rainbow-me/rainbowkit/styles.css';
import Script from 'next/script'
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import "react-step-progress-bar/styles.css";
import {arbitrum, avalanche, bsc, fantom, gnosis, mainnet, optimism, polygon,goerli, bscTestnet,polygonMumbai,fantomTestnet,baseGoerli,avalancheFuji} from "wagmi/chains";

import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  const chains = [arbitrum, avalanche, bsc, fantom, gnosis, mainnet, optimism, polygon,goerli,bscTestnet,polygonMumbai,fantomTestnet,baseGoerli,avalancheFuji];

  const { provider } = configureChains(
    chains,
    [
      infuraProvider({ apiKey:'c8fb3111e62c4b40867156ac3c3cbef4' }),
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })







    return(
      <>
       <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
       </WagmiConfig>
       
   
    
  <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css"
          integrity="sha384-b6lVK+yci+bfDmaY1u0zE8YYJt0TZxLEAFyYSLHId4xoVvsrQu3INevFKo+Xir8e"
          crossOrigin="anonymous"
        />
         
       
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
          crossOrigin="anonymous"
        ></Script>
         <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-qKXV1j0HvMUeCBQ+QVp7JcfGl760yU08IQ+GpUo5hlbpg51QRiuqHAJz8+BrxE/N"
        crossorigin="anonymous"></Script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.9.1/font/bootstrap-icons.min.css"
          integrity="sha512-5PV92qsds/16vyYIJo3T/As4m2d8b6oWYfoqV+vtizRB6KhF1F9kYzWzQmsO6T3z3QG2Xdhrx7FQ+5R1LiQdUA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
  
  </>)
}
