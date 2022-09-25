import React, { useEffect, useState } from "react";
import Head from "next/head";
import GoBack from "../components/goBack";


import {
  useAccount,
  useConnect,
  useContract,
  useProvider,
  useSigner,
  useContractEvent,
  useNetwork,
} from "wagmi";

import networks from "../utils/networks.json";

import {saltCalldata } from "../zkproof/salt/snarkjsSalt";
import contractAddress from "../utils/contractsaddress.json";
import saltContractABI from "../utils/abifiles/Salt.json";


export default function salt() {

    const [a,setA] = useState(0);
    const [b,setB] = useState(0);
    const [c,setC] = useState(0);

  
  const { data: dataAccount } = useAccount();
  const { activeChain } = useNetwork();

  const [loadingVerifyBtn, setLoadingVerifyBtn] = useState(false);
  const [loadingVerifyAndMintBtn, setLoadingVerifyAndMintBtn] = useState(false);

  const { data: signer } = useSigner();

  const provider = useProvider();

  const contract = useContract({
    addressOrName: contractAddress.saltContract,
    contractInterface: saltContractABI.abi,
    signerOrProvider: signer || provider,
  });

  const contractNoSigner = useContract({
    addressOrName: contractAddress.saltContract,
    contractInterface: saltContractABI.abi,
    signerOrProvider: provider,
  });

  const calculateProof = async () => {
    setLoadingVerifyBtn(true);
    console.log("Start calldata");
    console.log(a ,b, c );
    //let calldata = await zpdCalldata(workType, age, income, workTypeEligiblity, ageEligiblity, incomeEligiblity);
    let calldata = await saltCalldata(a, b, c);

    console.log("Done Calldata");
    console.log(calldata);
    
    if (!calldata) {
      setLoadingVerifyBtn(false);
      return "Invalid inputs to generate witness.";
    }


    try {
      let result;

      console.log("dataAccount");
      console.log(dataAccount);
      console.log("activeChain");
      console.log(activeChain);
      console.log("networks.selectedChain");
      console.log(networks.selectedChain);

      if (
        dataAccount?.address &&
        activeChain.id.toString() === networks.selectedChain
      ) {
        result = await contract.verifyProof(
          calldata.a,
          calldata.b,
          calldata.c,
          calldata.Input
        );
      } else {
        result = await contractNoSigner.verifyProof(
          calldata.a,
          calldata.b,
          calldata.c,
          calldata.Input
        );
      }
      console.log("result", result);
      setLoadingVerifyBtn(false);
      alert("Successfully verified");
    } catch (error) {
      setLoadingVerifyBtn(false);
      console.log(error);
      alert("Wrong solution");
    }
  };

  const verifySalt = async () => {
    console.log("Address", dataAccount?.address);
    calculateProof();
  };
  

  useEffect(() => {
    console.log("Salt page");

  }, []);
  return (
    <div>
      <Head>
        <title>zkSalt</title>
        <meta name="title" content="zkSalt" />
        <meta name="description" content="Zero Knowledge Salt" />
      </Head>
      <div className="mb-10">
        <GoBack />
      </div>
      <div className="flex  items-center justify-center">
        <div className="mx-5 mb-10 text-3xl font-bold text-transparent bg-clip-text
         bg-gradient-to-r from-sky-500 to-emerald-500 ">
          zkSalt
        </div>
      </div>
      <div className="flex items-center justify-center mb-10">
        <label className="px-2">A</label>
        <input
        value={a}
        type="text"
        onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
            }
        }}
        onChange={(e) => setA(Number(e.target.value ?? 0))}
        w="100px"
        className="flex items-center justify-center px-5 py-3 space-x-3 text-lg 
            font-medium rounded-md  bg-gradient-to-r from-sky-600 to-emerald-600
            hover:from-sky-500 hover:to-emerald-500"/>
    </div>

    <div className="flex  items-center justify-center mb-10">
        <label className="px-2">B</label>
        <input
            value={b}
            type="text"
            onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
            }
            }}
            onChange={(e) => setB(Number(e.target.value ?? 0))}
            w="140px"
            className="flex items-center justify-center px-5 py-3 space-x-3 text-lg 
            font-medium rounded-md bg-gradient-to-r from-sky-600 to-emerald-600
            hover:from-sky-500 hover:to-emerald-500"/>
    </div>
    <div className="flex  items-center justify-center mb-10">
        <label className="px-2">C</label>
        <input
            value={c}
            type="text"
            onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
            }
            }}
            onChange={(e) => setC(Number(e.target.value ?? 0))}
            w="140px"
            className="flex items-center justify-center px-5 py-3 space-x-3 text-lg 
            font-medium rounded-md bg-gradient-to-r from-sky-600 to-emerald-600
            hover:from-sky-500 hover:to-emerald-500"/>
    </div>
    <div className="flex  items-center justify-center mb-10">
        <button
            className="flex items-center justify-center px-5 py-3 space-x-3 text-lg
            font-medium rounded-md bg-gradient-to-r from-sky-600 to-emerald-600 
            hover:from-sky-500 hover:to-emerald-500"
            onClick={verifySalt}>Call Verify</button>
    
    </div>






      <div className="flex  items-center justify-center mb-10">
        <div className="md:w-6/12">
          <div className="my-5 font-semibold text-center">zkSalt:</div>
          <div className="space-y-5">
            <p>
              <span className="font-semibold">zkSalt</span> uses zero knowledge proof to verify proof               
            </p>
            <ul className="pl-5 space-y-2 list-disc">
              <li>
                Fill details. Generate Proof to 
                verify on-chain. If all criteria are true, proof is true
              </li>
              <li>
                Some Example....  
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}