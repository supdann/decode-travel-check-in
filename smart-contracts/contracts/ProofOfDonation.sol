// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract ProofOfDonation is ERC721URIStorage, Ownable {

    struct DonationStruct {
        uint256 sqm;
        address donator;
        address authorizer;
        bool paid;
    }

    DonationStruct[] donations;

    using ECDSA for bytes32;

    mapping(address => bool) public mintAuthorizer;

    // Events
    event DonationLogged(uint256 sqm, address indexed to, address indexed authorizer, bool paid);
    event AuthorizerAdded(address indexed authorizer);
    event AuthorizerRemoved(address indexed authorizer);

    constructor() ERC721("ProofOfDonation", "POD") {
        mintAuthorizer[msg.sender] = true;
        emit AuthorizerAdded(msg.sender);
    }

    function donate(bytes calldata signature, address to, uint256 sqm, bytes32 donationId, string memory tokenURI) external {
        // Verify signature
        address signer = _verify(signature, to, donationId);
        require(mintAuthorizer[signer], "ProofOfDonation: Unauthorized signer");

        // Mint token
        uint256 tokenId = uint256(donationId);
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI); 

        // Log the donation
        bool paid = (signer == owner());

        donations.push(DonationStruct(sqm, to, signer, paid));

        emit DonationLogged(sqm, to, signer, paid);
    }

    function addAuthorizer(address authorizer) external onlyOwner {
        mintAuthorizer[authorizer] = true;
        emit AuthorizerAdded(authorizer);
    }

    function removeAuthorizer(address authorizer) external onlyOwner {
        mintAuthorizer[authorizer] = false;
        emit AuthorizerRemoved(authorizer);
    }

    function _verify(
        bytes memory signature, 
        address to,
        bytes32 donationId
    ) internal pure returns (address) {
        return keccak256(abi.encode(to, donationId)).toEthSignedMessageHash().recover(signature);
    }

    function getAllDonations() public view returns (DonationStruct[] memory) {
        return donations;
    }
}
