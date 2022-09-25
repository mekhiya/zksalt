const hre = require("hardhat");
const fs = require('fs');

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = hre.ethers.utils.parseEther("1");

  // const Lock = await hre.ethers.getContractFactory("Lock");
  // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  // await lock.deployed();

  const SaltVerifier = await hre.ethers.getContractFactory("SaltVerifier");
  const saltVerifier = await SaltVerifier.deploy();
  console.log("SaltVerifier contract deployed to: ", saltVerifier.address);

  const Salt = await hre.ethers.getContractFactory("Salt");
  const salt = await Salt.deploy(saltVerifier.address)
  console.log("Salt contract deployed to: ", salt.address);

  /* this code writes the contract addresses to a local */
   /* file named config.js that we can use in the app */
   fs.writeFileSync('./config.js', `
   export const contractAddress = "${salt.address}"
   export const ownerAddress = "${salt.signer.address}"
   `)

  let callData= [
    ["0x1325400ce0afec996d490f15d9e662437e55330d8015f546ce017fde4801f7e7", "0x15c62e6c59a078605fa1d563568f1d051a383f2868a1c5c6680fd7767c56cae9"],[["0x016f26ec80cba6325db6ff034ea45ab50d29857e673d6637b2da31af9745a28b", "0x20f01fdb0a5867ca528aae12a8be0ab0b68509e01ce9e99387159d00d812aa45"],["0x0d6dd5c978092e88d510f0be744b99fef752efef21128f9bf46bf3b7c00c8b3b", "0x1cd343e5644f2f7460c95b3a93c7d06ef85f526b673f2c3f5453dd895c69c9a3"]],["0x1704c5c301f2df4bc5b381ef6783a35613c3e38bf1c12f970c47232627334526", "0x01b6e86298b0bd1f276c7ed7952d8bff905733d6fed15c2cd97d0d282a62940a"],["0x0000000000000000000000000000000000000000000000000000000000000021"]
  ];

  // console.log("callData[0] is ", callData[0]);
  // console.log("callData[1] is ", callData[1]);
  // console.log("callData[2] is ", callData[2]);
  // console.log("callData[3] is ", callData[3]);

  let result = await salt.verifyProof(
    callData[0],
    callData[1],
    callData[2],
    callData[3]
  );
  
   console.log("Result", result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
