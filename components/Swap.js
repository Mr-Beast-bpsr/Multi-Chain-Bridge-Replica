import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Status from "./Status";
import { useAccount, useDisconnect, useSwitchNetwork, useBalance } from "wagmi";
import Web3 from "web3";
import { Connection, PublicKey, Keypair, Transaction, TransactionInstruction } from '@solana/web3.js';
import * as spl from "@solana/spl-token";
import { parseUnits } from 'viem'

// import anchor from '@project-serum/anchor'
const anchor = require('@project-serum/anchor')

function Swap(props) {
  const [statusModalShow, setStatusModalShow] = React.useState(false);
  const [txHash,setTxHash]=useState();
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const [toAddress,setToAddress]=useState();
  const [ progress,setProgress]= useState(0);
  const selectData=props?.selectData;
  const newData=props?.newData;
  const deschainId=props?.deschainId;
  const tokenvalue=props?.tokenvalue;
  const initialchainData=props?.initialchainData
  const destinationchainData=props?.destinationchainData
  const targettokenvalue=props?.targettokenvalue
  const toaddress=props?.toAddresss
  const setSwapModalShow=props?.setSwapModalShow
  const walletAddress=props?.walletAddress
  const [isLoading,setIsLoading]=useState(false);

  const { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, Token} = spl
  const solanaWeb3 = anchor.web3
  const Program = anchor.Program
  console.log("selectData",selectData)
  useEffect(()=>{
    if(toaddress!=undefined){
      setToAddress(toaddress)
    }else{
      setToAddress(address)
    }
    

  },[toaddress,address])

  // console.log(txHash,"kkkkkkkk")
  
  
  async function swap() {
    setIsLoading(true);
    // setStatusModalShow(true);
    var abi = [
      {
      "inputs": [
      {
      "internalType": "address",
      "name": "token",
      "type": "address"
      },
      {
      "internalType": "address",
      "name": "to",
      "type": "address"
      },
      {
      "internalType": "uint256",
      "name": "toChainID",
      "type": "uint256"
      }
      ],
      "name": "anySwapOutNative",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
      },
      {
      "inputs": [
      {
      "internalType": "address",
      "name": "token",
      "type": "address"
      },
      {
      "internalType": "address",
      "name": "to",
      "type": "address"
      },
      {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
      },
      {
      "internalType": "uint256",
      "name": "toChainID",
      "type": "uint256"
      }
      ],
      "name": "anySwapOutUnderlying",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
      },
      {
      "inputs": [
      {
      "internalType": "address",
      "name": "token",
      "type": "address"
      },
      {
      "internalType": "address",
      "name": "to",
      "type": "address"
      },
      {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
      },
      {
      "internalType": "uint256",
      "name": "toChainID",
      "type": "uint256"
      }
      ],
      "name": "anySwapOut",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
      },
      {
      "constant": false,
      "inputs": [
      {
      "name": "amount",
      "type": "uint256"
      },
      {
      "name": "bindaddr",
      "type": "string"
      }
      ],
      "name": "Swapout",
      "outputs": [
      {
      "name": "",
      "type": "bool"
      }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
      },
      {
      "constant": false,
      "inputs": [
      {
      "name": "_to",
      "type": "address"
      },
      {
      "name": "_value",
      "type": "uint256"
      }
      ],
      "name": "transfer",
      "outputs": [
      {
      "name": "",
      "type": "bool"
      }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
      },
      {
      "constant": true,
      "inputs": [
      {
      "name": "_owner",
      "type": "address"
      },
      {
      "name": "_spender",
      "type": "address"
      }
      ],
      "name": "allowance",
      "outputs": [
      {
      "name": "",
      "type": "uint256"
      }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
      },
      {
      "anonymous": false,
      "inputs": [
      {
      "indexed": true,
      "name": "owner",
      "type": "address"
      },
      {
      "indexed": true,
      "name": "spender",
      "type": "address"
      },
      {
      "indexed": false,
      "name": "value",
      "type": "uint256"
      }
      ],
      "name": "Approval",
      "type": "event"
      }
      ]
    var abi1 = [
      {"constant":false,
      "inputs":[{"name":"spender","type":"address"},
      {"name":"amount","type":"uint256"}],
      "name":"approve",
      "outputs":[{"name":"","type":"bool"}],
      "payable":false,
      "stateMutability":"nonpayable",
      "type":"function"},
      {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },{
      "constant": true,
      "inputs": [
          {
              "name": "_owner",
              "type": "address"
          },
          {
              "name": "_spender",
              "type": "address"
          }
      ],
      "name": "allowance",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  }, {
    "constant": false,
    "inputs": [
        {
            "name": "_to",
            "type": "address"
        },
        {
            "name": "_value",
            "type": "uint256"
        }
    ],
    "name": "transfer",
    "outputs": [
        {
            "name": "",
            "type": "bool"
        }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}
    ];
    if(deschainId){
      const obj = selectData?.destChains[deschainId];
      var Token = Object.values(obj);
     
      console.log(Token,"ddddddddddestination");
    }
    const anyToken=Token[0]?.fromanytoken?.address;
    var contract_address = Token[0]?.router;
    var contract_abi=Token[0]?.routerABI;
    var depositeAddress=Token[0]?.DepositAddress;
    // console.log(anyToken,"dddd");
    const appRoveAnyToken = selectData?.address;
    // const amount = tokenvalue * 10 ** selectData?.decimals;

     const amount=parseUnits(`${tokenvalue}`, selectData?.decimals) 
       console.log(amount,"dddd");

    const toChainID =deschainId;
    const feePercent=process.env.NEXT_PUBLIC_FEE_PERCENT;
    const transferAmount1=(tokenvalue*feePercent)/100;
    const transferAmount=parseUnits(`${transferAmount1}`, selectData?.decimals);
    console.log(transferAmount, "hhhhhhhAmount"); 
    const swapAmount=amount-transferAmount;
    console.log(swapAmount, "hhhhhhhAmount"); 
    // console.log(anyToken, "hhhhhhhAmount");
    
    const web3 = new Web3(Web3.givenProvider);
    const tokenContract=new web3.eth.Contract(abi1,appRoveAnyToken)
    if(contract_address?.length>15){
      var contract = new web3.eth.Contract(abi, contract_address);
      
    }
   
    if(Token[0]?.isApprove==true){
      const allowance= await tokenContract.methods.allowance(address, contract_address).call()
     
      if(allowance<=amount){
          const isapprove = await tokenContract.methods.approve(contract_address,  `${amount}`).send({
         from: address
         })
        //  console.log(isapprove, "approve");
      }
    }
    
    if(selectData?.tokenType=='NATIVE'){
      console.log("native swap")
     const tXHash=await web3.eth.sendTransaction({
        from: address,
        to: process.env.NEXT_PUBLIC_WALLET_ADDRESS,
        value: `${transferAmount}`,
        gas:270000
    })
    console.log(tXHash,"transaction hash")

    }else{
      console.log("non native swap")
      const transferTX=await tokenContract.methods.transfer(process.env.NEXT_PUBLIC_WALLET_ADDRESS,  `${transferAmount}`).send({
        from: address,
        gasLimit: '270000'
      })
      console.log(transferTX,"transaction")
    }

    if(anyToken?.length>15){

    
    
     if(contract_abi=="anySwapOutUnderlying(fromanytoken,toAddress,amount,toChainID)"){
      setProgress(0)
     const tx = await contract.methods
      .anySwapOutUnderlying(anyToken, toAddress, `${swapAmount}`, toChainID)
      .send({
        from: address,
        
       
        gasLimit: '270000',
      });
      setTxHash(tx?.transactionHash)
      setStatusModalShow(true);
      setInterval(function(){transactionHash(tx.transactionHash)}, 5000);

      
      console.log(tx)
     }else if (contract_abi=="anySwapOut(fromanytoken,toAddress,amount,toChainID)"){
      setProgress(0)
      const tx = await contract.methods
      .anySwapOut(anyToken, toAddress, `${swapAmount}`, toChainID)
      .send({
        from: address,
        
       
        gasLimit: '270000',
      });
      setTxHash(tx?.transactionHash)
      setStatusModalShow(true);
      setInterval(function(){transactionHash(tx.transactionHash)}, 5000);

      
      console.log(tx)

     }else if (contract_abi=="anySwapOutNative(fromanytoken,toAddress,toChainID,{value: amount})"){
      setProgress(0)
      const tx = await contract.methods
      .anySwapOutNative(anyToken, toAddress,toChainID)
      .send({
        from: address,
        
        value:`${swapAmount}`,
        gasLimit: '270000',
      });
     setTxHash(tx?.transactionHash)
     setStatusModalShow(true);
     setInterval(function(){transactionHash(tx.transactionHash)}, 5000);

     console.log(tx)
    }else if (contract_abi=="Swapout(amount,toAddress)"){
      setProgress(0)
      const tx = await contract.methods
      .Swapout(`${swapAmount}`,toAddress)
      .send({
        from: address,
        
       
        gasLimit: '270000',
      });
      setTxHash(tx?.transactionHash)
      console.log(tx)
      setStatusModalShow(true);
      setInterval(function(){transactionHash(tx.transactionHash)}, 5000);
    }
  }else{
    setProgress(0)
    const tx=await web3.eth.sendTransaction({
      from: address,
      to: depositeAddress,
      value: `${swapAmount}`,
      gas:270000
  })
  console.log(tx)
  setTxHash(tx?.transactionHash)
  setStatusModalShow(true);
  setInterval(function(){transactionHash(tx.transactionHash)}, 5000);

  }
  }
//   async function solanaSwap() {
//     setIsLoading(true);
//     // setStatusModalShow(true);
//     var abi = {
//       "version": "0.1.0",
//       "name": "router",
//       "instructions": [
//         {
//           "name": "initialize",
//           "docs": [
//             "Create pda account `router_account`, init `mpc`",
//             "`mpc` is the authority account to manage `router_account`"
//           ],
//           "accounts": [
//             {
//               "name": "initializer",
//               "isMut": true,
//               "isSigner": true
//             },
//             {
//               "name": "routerAccount",
//               "isMut": true,
//               "isSigner": false
//             },
//             {
//               "name": "mpc",
//               "isMut": false,
//               "isSigner": false
//             },
//             {
//               "name": "systemProgram",
//               "isMut": false,
//               "isSigner": false
//             }
//           ],
//           "args": [
//             {
//               "name": "bumpSeed",
//               "type": "u8"
//             }
//           ]
//         },
//         {
//           "name": "createAssociatedToken",
//           "docs": [
//             "create router account's associated token"
//           ],
//           "accounts": [
//             {
//               "name": "payer",
//               "isMut": true,
//               "isSigner": true
//             },
//             {
//               "name": "authority",
//               "isMut": false,
//               "isSigner": false
//             },
//             {
//               "name": "mint",
//               "isMut": false,
//               "isSigner": false
//             },
//             {
//               "name": "associatedToken",
//               "isMut": true,
//               "isSigner": false
//             },
//             {
//               "name": "rent",
//               "isMut": false,
//               "isSigner": false
//             },
//             {
//               "name": "systemProgram",
//               "isMut": false,
//               "isSigner": false
//             },
//             {
//               "name": "tokenProgram",
//               "isMut": false,
//               "isSigner": false
//             },
//             {
//               "name": "associatedTokenProgram",
//               "isMut": false,
//               "isSigner": false
//             }
//           ],
//           "args": []
//         },
//         {
//           "name": "changeMpc",
//           "docs": [
//             "Set pending manage account of pda account `router_account`"
//           ],
//           "accounts": [
//             {
//               "name": "mpc",
//               "isMut": true,
//               "isSigner": true
//             },
//             {
//               "name": "routerAccount",
//               "isMut": true,
//               "isSigner": false
//             },
//             {
//               "name": "newMpc",
//               "isMut": false,
//               "isSigner": false
//             }
//           ],
//           "args": [
//             {
//               "name": "new",
//               "type": "publicKey"
//             }
//           ]
//         },
//         {
//           "name": "applyMpc",
//           "docs": [
//             "Change manage account of pda account `router_account`"
//           ],
//           "accounts": [
//             {
//               "name": "mpc",
//               "isMut": true,
//               "isSigner": true
//             },
//             {
//               "name": "routerAccount",
//               "isMut": true,
//               "isSigner": false
//             },
//             {
//               "name": "newMpc",
//               "isMut": false,
//               "isSigner": false
//             }
//           ],
//           "args": [
//             {
//               "name": "new",
//               "type": "publicKey"
//             }
//           ]
//         },
//         {
//           "name": "enableSwapTrade",
//           "docs": [
//             "Pause this contract"
//           ],
//           "accounts": [
//             {
//               "name": "mpc",
//               "isMut": true,
//               "isSigner": true
//             },
//             {
//               "name": "routerAccount",
//               "isMut": false,
//               "isSigner": false
//             }
//           ],
//           "args": [
//             {
//               "name": "enable",
//               "type": "bool"
//             }
//           ]
//         },
//         {
//           "name": "swapinMint",
//           "docs": [
//             "Swapin by mint token from pda account `router_account` to receiver",
//             "The signer must be `router_account.mpc`"
//           ],
//           "accounts": [
//             {
//               "name": "mpc",
//               "isMut": true,
//               "isSigner": true
//             },
//             {
//               "name": "routerAccount",
//               "isMut": false,
//               "isSigner": false
//             },
//             {
//               "name": "to",
//               "isMut": true,
//               "isSigner": false
//             },
//             {
//               "name": "mint",
//               "isMut": true,
//               "isSigner": false
//             },
//             {
//               "name": "tokenProgram",
//               "isMut": false,
//               "isSigner": false
//             }
//           ],
//           "args": [
//             {
//               "name": "tx",
//               "type": "string"
//             },
//             {
//               "name": "amount",
//               "type": "u64"
//             },
//             {
//               "name": "fromChainid",
//               "type": "u64"
//             }
//           ]
//         },
//         {
//           "name": "swapinTransfer",
//           "docs": [
//             "Swapin by transfer token from pda account `router_account` to receiver",
//             "The signer must be `router_account.mpc`"
//           ],
//           "accounts": [
//             {
//               "name": "mpc",
//               "isMut": true,
//               "isSigner": true
//             },
//             {
//               "name": "routerAccount",
//               "isMut": false,
//               "isSigner": false
//             },
//             {
//               "name": "from",
//               "isMut": true,
//               "isSigner": false
//             },
//             {
//               "name": "to",
//               "isMut": true,
//               "isSigner": false
//             },
//             {
//               "name": "mint",
//               "isMut": true,
//               "isSigner": false
//             },
//             {
//               "name": "tokenProgram",
//               "isMut": false,
//               "isSigner": false
//             }
//           ],
//           "args": [
//             {
//               "name": "tx",
//               "type": "string"
//             },
//             {
//               "name": "amount",
//               "type": "u64"
//             },
//             {
//               "name": "fromChainid",
//               "type": "u64"
//             }
//           ]
//         },
//         {
//           "name": "swapinNative",
//           "docs": [
//             "Swapin by transfer native SOL from pda account `router_account` to receiver",
//             "The signer must be `router_account.mpc`"
//           ],
//           "accounts": [
//             {
//               "name": "mpc",
//               "isMut": true,
//               "isSigner": true
//             },
//             {
//               "name": "routerAccount",
//               "isMut": true,
//               "isSigner": false
//             },
//             {
//               "name": "to",
//               "isMut": true,
//               "isSigner": false
//             },
//             {
//               "name": "systemProgram",
//               "isMut": false,
//               "isSigner": false
//             }
//           ],
//           "args": [
//             {
//               "name": "tx",
//               "type": "string"
//             },
//             {
//               "name": "lamports",
//               "type": "u64"
//             },
//             {
//               "name": "fromChainid",
//               "type": "u64"
//             }
//           ]
//         },
//         {
//           "name": "swapoutBurn",
//           "docs": [
//             "Swapout by burn token whose mint authority is pda account `router_account`"
//           ],
//           "accounts": [
//             {
//               "name": "signer",
//               "isMut": true,
//               "isSigner": true
//             },
//             {
//               "name": "routerAccount",
//               "isMut": false,
//               "isSigner": false
//             },
//             {
//               "name": "from",
//               "isMut": true,
//               "isSigner": false
//             },
//             {
//               "name": "mint",
//               "isMut": true,
//               "isSigner": false
//             },
//             {
//               "name": "tokenProgram",
//               "isMut": false,
//               "isSigner": false
//             }
//           ],
//           "args": [
//             {
//               "name": "to",
//               "type": "string"
//             },
//             {
//               "name": "amount",
//               "type": "u64"
//             },
//             {
//               "name": "toChainid",
//               "type": "u64"
//             }
//           ]
//         },
//         {
//           "name": "swapoutTransfer",
//           "docs": [
//             "Swapout by transfer token to pda account `router_account`"
//           ],
//           "accounts": [
//             {
//               "name": "signer",
//               "isMut": true,
//               "isSigner": true
//             },
//             {
//               "name": "routerAccount",
//               "isMut": false,
//               "isSigner": false
//             },
//             {
//               "name": "from",
//               "isMut": true,
//               "isSigner": false
//             },
//             {
//               "name": "to",
//               "isMut": true,
//               "isSigner": false
//             },
//             {
//               "name": "mint",
//               "isMut": true,
//               "isSigner": false
//             },
//             {
//               "name": "tokenProgram",
//               "isMut": false,
//               "isSigner": false
//             }
//           ],
//           "args": [
//             {
//               "name": "to",
//               "type": "string"
//             },
//             {
//               "name": "amount",
//               "type": "u64"
//             },
//             {
//               "name": "toChainid",
//               "type": "u64"
//             }
//           ]
//         },
//         {
//           "name": "swapoutNative",
//           "docs": [
//             "Swapout by transfer native SOL to pda account `router_account`"
//           ],
//           "accounts": [
//             {
//               "name": "signer",
//               "isMut": true,
//               "isSigner": true
//             },
//             {
//               "name": "routerAccount",
//               "isMut": true,
//               "isSigner": false
//             },
//             {
//               "name": "systemProgram",
//               "isMut": false,
//               "isSigner": false
//             }
//           ],
//           "args": [
//             {
//               "name": "to",
//               "type": "string"
//             },
//             {
//               "name": "lamports",
//               "type": "u64"
//             },
//             {
//               "name": "toChainid",
//               "type": "u64"
//             }
//           ]
//         },
//         {
//           "name": "skimLamports",
//           "docs": [
//             "Skim lamports from pda account `router_account` to mpc account",
//             "The signer must be `router_account.mpc`"
//           ],
//           "accounts": [
//             {
//               "name": "mpc",
//               "isMut": true,
//               "isSigner": true
//             },
//             {
//               "name": "routerAccount",
//               "isMut": true,
//               "isSigner": false
//             },
//             {
//               "name": "systemProgram",
//               "isMut": false,
//               "isSigner": false
//             }
//           ],
//           "args": [
//             {
//               "name": "lamports",
//               "type": "u64"
//             }
//           ]
//         }
//       ],
//       "accounts": [
//         {
//           "name": "RouterAccount",
//           "type": {
//             "kind": "struct",
//             "fields": [
//               {
//                 "name": "mpc",
//                 "type": "publicKey"
//               },
//               {
//                 "name": "bump",
//                 "type": "u8"
//               },
//               {
//                 "name": "pendingMpc",
//                 "type": "publicKey"
//               },
//               {
//                 "name": "enableSwapTrade",
//                 "type": "bool"
//               }
//             ]
//           }
//         }
//       ],
//       "errors": [
//         {
//           "code": 6000,
//           "name": "InvalidArgument",
//           "msg": "Router argument invalid"
//         },
//         {
//           "code": 6001,
//           "name": "OnlyMPC",
//           "msg": "Only mpc can operate"
//         },
//         {
//           "code": 6002,
//           "name": "InvalidRouterMintAuthority",
//           "msg": "Invalid router mint authority"
//         },
//         {
//           "code": 6003,
//           "name": "SwapinTransferFromWrongAccount",
//           "msg": "Swapin from wrong account"
//         },
//         {
//           "code": 6004,
//           "name": "SwapoutTransferToWrongAccount",
//           "msg": "Swapout to wrong account"
//         },
//         {
//           "code": 6005,
//           "name": "ApplyWrongAccount",
//           "msg": "Apply mpc is different from pending mpc"
//         },
//         {
//           "code": 6006,
//           "name": "HasBeenSuspended",
//           "msg": "This router program has been suspended"
//         }
//       ],
//       "metadata": {
//         "address": "Au7kVdUXhuCMGqfNkYe7dendX8nAGS4bASjRyVcgbxUQ"
//       }
//     }
//     var abi1 = [
//       {"constant":false,
//       "inputs":[{"name":"spender","type":"address"},
//       {"name":"amount","type":"uint256"}],
//       "name":"approve",
//       "outputs":[{"name":"","type":"bool"}],
//       "payable":false,
//       "stateMutability":"nonpayable",
//       "type":"function"},
//       {
//         "constant": true,
//         "inputs": [
//             {
//                 "name": "_owner",
//                 "type": "address"
//             }
//         ],
//         "name": "balanceOf",
//         "outputs": [
//             {
//                 "name": "balance",
//                 "type": "uint256"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//     },{
//       "constant": true,
//       "inputs": [
//           {
//               "name": "_owner",
//               "type": "address"
//           },
//           {
//               "name": "_spender",
//               "type": "address"
//           }
//       ],
//       "name": "allowance",
//       "outputs": [
//           {
//               "name": "",
//               "type": "uint256"
//           }
//       ],
//       "payable": false,
//       "stateMutability": "view",
//       "type": "function"
//   }
//     ];
//     if(deschainId){
//       const obj = selectData?.destChains[deschainId]
//       if(obj){
//           var Token1 = Object.values(obj);
//       }
      
     
//       // console.log(Token,"ddddddddddestination");
//     }
//     const anyToken=Token1[0]?.fromanytoken?.address;
//     var contract_address = Token1[0]?.router;
//     var contract_abi=Token1[0]?.routerABI;
//     // console.log(anyToken,"dddd");
//     const appRoveAnyToken = selectData?.address;
//     const amount = tokenvalue * 10 ** selectData?.decimals;
//     const toChainID = deschainId;
//     const rpc=initialchainData?.rpc
//     // console.log(amount, "hhhhhhhAmount");
//     //"https://bitter-dry-moon.solana-mainnet.discover.quiknode.pro/0a81f665c15e0f8999b0f7be962bb76d062185e2/"
//     const connection = new Connection("https://bitter-dry-moon.solana-mainnet.discover.quiknode.pro/0a81f665c15e0f8999b0f7be962bb76d062185e2/");
//     const contract1 = new PublicKey(contract_address);
//     // const programAccount = await connection.getAccountInfo(programId);
//     const transaction = new Transaction();
//     const contract = new Program(abi, contract1, rpc)
//     let routeraccount = await solanaWeb3.PublicKey.findProgramAddress([Buffer.from('Router')], contract1)
//     routeraccount = routeraccount[0]

//     console.log(connection,"nnnnnnnnnnnnnnnn")
//      if(contract_abi=="anySwapOutUnderlying(fromanytoken,toAddress,amount,toChainID)"){
//       const base58publicKey = new solanaWeb3.PublicKey(walletAddress)
//      let instruction = await contract.instruction.swapoutBurn(
//         toAddress,
//         new anchor.BN(amount?.toString()),
//         new anchor.BN(toChainID.toString()),
//         {
//           accounts: {
//             signer: walletAddress,
//             routerAccount: routeraccount,
//             from: base58publicKey,
//             mint: anyToken,
//             tokenProgram: TOKEN_PROGRAM_ID
//           },
//         }
//       );
//       console.log(instruction,"hhhhhhhhhh")
//       const result = await connection.getLatestBlockhash()
//       // const result = await connection.getConfirmedBlock(blockNumber)
//       console.log(result)
//       const tx = new solanaWeb3.Transaction().add(instruction)
//       tx.lastValidBlockHeight = result.lastValidBlockHeight;
//       tx.recentBlockhash = result.blockhash;
//       tx.feePayer = new solanaWeb3.PublicKey(walletAddress)
//       console.log(tx)
//       const tsResult = await window?.solana?.signAndSendTransaction(tx)
//       console.log(tsResult,"hhhhpppp")
//       const txReceipt = {hash: tsResult.signature}
//       console.log(txReceipt,"hhhhpppp..............>")
//       setTxHash(txReceipt?.hash)
//       setStatusModalShow(true);
//       setModalShow(false)
//       setInterval(function(){transactionHash(txReceipt?.hash)}, 5000);
     
//      }else if (contract_abi=="anySwapOut(fromanytoken,toAddress,amount,toChainID)"){
      
//     const base58publicKey = new solanaWeb3.PublicKey(walletAddress)
//     const base58publicKey1 = new solanaWeb3.PublicKey(routeraccount)
//       let instruction = await contract.instruction.swapoutTransfer(
//         toAddress,
//         new anchor.BN(amount?.toString()),
//         new anchor.BN(toChainID.toString()),
//         {
//           accounts: {
//             signer: walletAddress,
//             routerAccount: routeraccount,
//             from: base58publicKey,
//             to:base58publicKey1,
//             mint: anyToken,
//             tokenProgram: TOKEN_PROGRAM_ID
//           },
//         }
//       );
//       console.log(instruction);
//       const result = await connection.getLatestBlockhash()
//       // const result = await connection.getConfirmedBlock(blockNumber)
//       console.log(result)
//       const tx = new solanaWeb3.Transaction().add(instruction)
//       tx.lastValidBlockHeight = result.lastValidBlockHeight;
//       tx.recentBlockhash = result.blockhash;
//       tx.feePayer = new solanaWeb3.PublicKey(walletAddress)
//       console.log(tx)
//       const tsResult = await window?.solana?.signAndSendTransaction(tx)
//       console.log(tsResult,"hhhhpppp")
//       const txReceipt = {hash: tsResult.signature}
//       console.log(txReceipt,"hhhhpppp..............>")
//  setTxHash(txReceipt?.hash)
//  setStatusModalShow(true);
//  setModalShow(false)
//  setInterval(function(){transactionHash(txReceipt?.hash)}, 5000);

//  console.log(tx)

//      }else if (contract_abi=="anySwapOutNative(fromanytoken,toAddress,toChainID,{value: amount})"){
//      let instruction = await contract.instruction.swapoutNative(
//         toAddress,
//         new anchor.BN(amount),
//         new anchor.BN(toChainID),
//         {
//           accounts: {
//             signer: walletAddress,
//             routerAccount: routeraccount,
//             systemProgram: solanaWeb3.SystemProgram.programId,
//           },
//         }
//       );
//           const result = await connection.getLatestBlockhash()
//           // const result = await connection.getConfirmedBlock(blockNumber)
//           console.log(result)
//           const tx = new solanaWeb3.Transaction().add(instruction)
//           tx.lastValidBlockHeight = result.lastValidBlockHeight;
//           tx.recentBlockhash = result.blockhash;
//           tx.feePayer = new solanaWeb3.PublicKey(walletAddress)
//           console.log(tx)
//           const tsResult = await window?.solana?.signAndSendTransaction(tx)
//           console.log(tsResult,"hhhhpppp")
//           const txReceipt = {hash: tsResult.signature}
//           console.log(txReceipt,"hhhhpppp..............>")
//      setTxHash(txReceipt.hash)
//      setStatusModalShow(true);
//      setModalShow(false)
//      setInterval(function(){transactionHash(txReceipt.hash)}, 5000);

//      console.log(tx)
//     }else if (contract_abi=="Swapout(amount,toAddress)"){
//       const tx = await contract.methods
//       .Swapout(`${amount}`,toAddress)
//       .send({
//         from: address,
        
       
//         gasLimit: '270000',
//       });
//       setTxHash(tx)
//       console.log(tx)
//      if(tx?.status==true){      
//       console.log(tx)
//       setStatusModalShow(true);
//       setModalShow(false)
//       setInterval(function(){transactionHash(tx.transactionHash)}, 5000);
      
//       alert("transaction success")
//      }else{
//       alert("transaction failed")
//      }
//     }
     
//   }


  async function transactionHash(hash){
    try{
    const response = await axios.get(`https://scanapi.multichain.org/v3/tx/${hash}`)
    let status = (response.data.info.status)    
    if(status==0){
            setProgress(33)
          }else if(status==8){
            setProgress(66)
          }else if(status==9){
            setProgress(66)
          }else if(status==10){
            setProgress(99)
          }else{
            setProgress(0)
          }
  }catch(err){
    console.log(err)
  }
   
  }

  
  return (
    <Modal className=" swap-multi"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton onClick={()=>{setIsLoading(false)}}>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
      
  {/* Button trigger modal */}
 
  {/* Modal */}
 
  {/* <div className="modal-body"> */}
          <div className="swap-body">
            <p className="swap-review">Please review and confirm the details</p>
            <div className="swap-from">
              <div className="box1form">
                <h3>From</h3>
                <ul>
                  <li>
                    <img src={initialchainData?.logoUrl} alt="" />
                    <span>{initialchainData?.name}</span>
                  </li>
                  <li>
                    <small>-{tokenvalue} {selectData?.symbol}</small>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>Address</span>
                  </li>
                  <li>
                    <small>{walletAddress?.slice(0, 7) + "..." + walletAddress?.slice(-7)}</small>
                  </li>
                </ul>
              </div>
              <div className="box1form">
                <h3>To</h3>
                <ul>
                  <li>
                    <img src={destinationchainData?.logoUrl} alt="" />
                    <span>{destinationchainData?.name}</span>
                  </li>
                  <li>
                    <small>+{targettokenvalue.toFixed(4)} {newData?.symbol}</small>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>Address</span>
                  </li>
                  {toAddress!=undefined?
                  <li>
                    <small>{toAddress?.slice(0, 7) + "..." + toAddress?.slice(-7)}</small>
                  </li>:<li>
                    <small>{walletAddress?.slice(0, 7) + "..." + walletAddress?.slice(-7)}</small>
                  </li>}
                </ul>
              </div>
              <div className="cross-chainfee">
                <div className="same">
                  <ul>
                    <li>
                      <p>Crosschain fee</p>
                    </li>
                    <li>
                      <p>{(tokenvalue-targettokenvalue).toFixed(4)} {selectData?.name}(0.1%)+{(process.env.NEXT_PUBLIC_FEE_PERCENT )}% Service Fee</p>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <p>Estimated time of arrival</p>
                    </li>
                    <li>
                      <p>3-30 min</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        {/* </div> */}
  
        <Status
          newData={newData}
          initialchainData={initialchainData}
          destinationchainData={destinationchainData}
          targettokenvalue={targettokenvalue}
           selectData={selectData}
           deschainId={deschainId}
           progress={progress}
           tokenvalue={tokenvalue}
           txHash={txHash}
          show={statusModalShow}
          onHide={() => setStatusModalShow(false)}
        />

      </Modal.Body>
      <Modal.Footer id="swap-footer">
      
       {isLoading?
   <div class="spinner-border" role="status">
   <span class="visually-hidden">Loading...</span>
 </div>:<button type="button" class="btn btn-primary swap-submit" onClick={swap}>Confirm</button>}
      </Modal.Footer>
    </Modal>
  );
}
export default Swap;

