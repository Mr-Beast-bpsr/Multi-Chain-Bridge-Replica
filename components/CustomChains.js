import { Chain } from 'wagmi'
 
export const customChains = [{
  
    name: "Fantom",
    symbol: "FTM",
    rpc: "https://rpc.ankr.com/fantom_testnet",
    explorer: {
      tx: "https://ftmscan.com/tx/",
      address: "https://ftmscan.com/address/",
    },
    explorer_cn: {
      tx:  "https://ftmscan.com/tx/",
      address: "https://ftmscan.com/address/",
    },
    logoUrl: "https://assets.coingecko.com/coins/images/4001/small/Fantom.png",
    networkType: "testnet",
    destChain: []
  
} ,
{
  
  name: "Solana",
  symbol: "SOL",
  rpc: "https://api.testnet.solana.com ",
  explorer: {
    tx:  "https://solscan.io/tx/",
    address: "https://solscan.io/account/"
   ,
  },
  explorer_cn: {
    tx:   "https://solscan.io/tx/",
    address: "https://solscan.io/account/",
  },
  logoUrl: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
  networkType: "testnet",
  destChain: []

},
{
  
  name: "Goerli",
  symbol: "ETH",
  rpc: "https://rpc.ankr.com/eth_goerli",
  explorer: {
    tx:  "https://goerli.etherscan.io/tx/",
    address: "https://goerli.etherscan.io/address"
   ,
  },
  explorer_cn: {
    tx:   "https://goerli.etherscan.io/tx/",
    address: "https://goerli.etherscan.io/address",
  },
  logoUrl: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  networkType: "testnet",
  destChain: []

},
{
  
  name: "Rinkeby",
  symbol: "ETH",
  rpc:"https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  explorer: {
    tx:  "https://rinkeby.etherscan.io/tx/",
    address: "https://rinkeby.etherscan.io/address/"
   ,
  },
  explorer_cn: {
    tx:  "https://rinkeby.etherscan.io/tx/",
    address: "https://rinkeby.etherscan.io/address/",
  },
  logoUrl: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  networkType: "testnet",
  destChain: []

},]