import abi from "./NFT721.json";
import bookingABI from "./booking.json";
import donationABI from "./ProofOfDonation.json";

export const contractABI = abi.abi;
export const donationContractABI = donationABI.abi;
export const bookingContractABI = bookingABI.abi;

export const contractAddress = "0xB620BAC37256b173c4c3Ba88a6850189EEDaF0BC";
export const donationContractAddress =
  "0x90B552FFa55d572B3367e954f4750012CF0e96F9";
export const bookingContractAddress =
  "0xF86fCa97f106611e23a373310Ee66E5a4D5381C9";
