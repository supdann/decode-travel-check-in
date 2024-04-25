import { BigNumber } from "ethers";
import {ethers} from "hardhat"

async function main() {

    const bookingContract = "0xF86fCa97f106611e23a373310Ee66E5a4D5381C9";

    const deployedNFT = await ethers.getContractAt("BookingNFT", bookingContract)
    await deployedNFT.checkIn("wallet-address", 1, "");

    console.log("Success")!
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });