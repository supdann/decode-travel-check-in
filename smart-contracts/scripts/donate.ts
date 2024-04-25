import { BigNumber } from "ethers";
import {ethers} from "hardhat"
import { namehash } from "ethers/lib/utils";

async function main() {
    const [deployer] = await ethers.getSigners();
    const donationContract = "0x90B552FFa55d572B3367e954f4750012CF0e96F9";

    // const deployedNFT = await ethers.getContractAt("ProofOfDonation", "donationContract")

    for (let i = 1; i <= 30; i++) {
        // Generate a unique donationId for each iteration
        const donationId = `donation${i}`;
        
        // Calculate the namehash of the donationId
        const nameHash = namehash(donationId);

        // Define the recipient address and types for the ABI encoding
        const toAddress = "0xA9A7125B0CffdbdE40fe28a3A2954659f7C0e5a9";
        const types = ["address", "bytes32"];
        const values = [toAddress, nameHash];

        // Encode the types and values to create the message
        const message = ethers.utils.defaultAbiCoder.encode(types, values);

        // Hash the encoded message
        const hash = ethers.utils.keccak256(message);

        // Sign the hash using the signer
        const signature = await deployer.signMessage(ethers.utils.arrayify(hash));

        // Print the donationId, its nameHash, and the signature
        console.log(`Donation ID: ${donationId}`);
        console.log(`Namehash: ${nameHash}`);
        console.log(`Signature: ${signature}\n`);
    }

    // await deployedNFT.donate(signature, toAddress, sqm, namehash(donationId), "");
    // console.log("Success")!
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });