# Smart Contracts

This folder contains the smart contracts for the project, which include `ProofOfStay.sol` and `ProofOfDonation.sol`. These contracts are designed to handle guest check-ins at a hotel and manage donations, respectively.

## Setup

To set up and compile the smart contracts, follow these steps:

1.  Install the necessary dependencies:

```bash

npm i

```

2.  Compile the smart contracts using Hardhat:

```bash

npx hardhat compile

```

## Environment File

Before running the smart contracts, create a `.env` file in the root directory with the following content:

COLUMBUS_URL=camino-rpc-url

PRIVATE_KEY=private-wallet-key

## Contracts

### ProofOfStay.sol

This contract manages hotel guest check-ins with the following features:

- **Check-In**: Only callable by the contract owner. It checks in a guest by creating an ERC721 NFT for the guest's wallet using a hash of the booking ID. This method also updates a mapping to indicate that the guest is actively checked in.

- **Check-Out**: Callable by the hotel/contract owner to set the booking ID mapping to false, indicating that the guest has checked out.

### ProofOfDonation.sol

This contract manages the creation and management of donation NFTs:

- **Authorized Signatures**: Contains a mapping of addresses authorized to create signatures for approving donations. The contract owner can add addresses to this mapping.

- **Minting Donation NFTs**: If there is a valid signature, the contract caller can mint an NFT representing a donation. The NFT is semi-soulbound and can only be transferred by the contract owner.

## Deployment and Interaction

To deploy and interact with the contracts, you need to run the deployment scripts first. After deployment, use the mint and donate scripts to mint check-in NFTs and create/mint NFTs for approved signatures.

## Scripts

The repository includes scripts to deploy the contracts and mint the NFTs. These scripts are essential for setting up and testing the functionalities described above.