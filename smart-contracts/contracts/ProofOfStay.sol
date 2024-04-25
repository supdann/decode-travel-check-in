// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BookingNFT is ERC721URIStorage, Ownable {
    struct BookingStruct {
        address guest;
        uint256 bookingId;
    }

    BookingStruct[] bookings;

    mapping(bytes32 => bool) public tokenIdCheckedIn;

    // Events
    event CheckedIn(address indexed to, uint256 tokenId, string tokenURI);
    event CheckedOut(uint256 tokenId);

    constructor() ERC721("ProofOfStay", "POS") {}

    /**
     * @dev Check in by minting an NFT to a specific address.
     * @param to The recipient address of the NFT.
     * @param bookingId The booking ID string used to generate the token ID.
     * @param tokenURI The URI for token metadata.
     */
    function checkIn(address to, string memory bookingId, string memory tokenURI) public onlyOwner {
        bytes32 tokenIdHash = keccak256(abi.encodePacked(bookingId));
        uint256 tokenId = uint256(tokenIdHash);
        require(!tokenIdCheckedIn[tokenIdHash], "BookingNFT: Already checked in");

        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        tokenIdCheckedIn[tokenIdHash] = true;

        bookings.push(BookingStruct(to, tokenId));

        emit CheckedIn(to, tokenId, tokenURI);
    }

    /**
     * @dev Check out by setting the checked in status to false for a token ID.
     * @param bookingId The booking ID string used to identify the token.
     */
    function checkOut(string memory bookingId) public onlyOwner {
        bytes32 tokenIdHash = keccak256(abi.encodePacked(bookingId));
        uint256 tokenId = uint256(tokenIdHash);
        require(tokenIdCheckedIn[tokenIdHash], "BookingNFT: Not checked in or already checked out");

        tokenIdCheckedIn[tokenIdHash] = false;

        emit CheckedOut(tokenId);
    }

    function getAllBookings() public view returns (BookingStruct[] memory) {
        return bookings;
    }
}
