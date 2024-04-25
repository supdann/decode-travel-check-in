import { expect } from "chai";
import { ethers } from "hardhat";
import { BookingNFT } from "../typechain";
import { Signer } from "ethers";

describe("BookingNFT", function () {
  let bookingNFT: BookingNFT;
  let owner: Signer;
  let addr1: Signer;
  let addrs: Signer[];

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    const BookingNFT = await ethers.getContractFactory("BookingNFT");
    [owner, addr1, ...addrs] = await ethers.getSigners();

    // Deploy a new BookingNFT contract for each test
    bookingNFT = await BookingNFT.deploy() as BookingNFT;
    await bookingNFT.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await bookingNFT.owner()).to.equal(await owner.getAddress());
    });
  });

  describe("Transactions", function () {
    it("Should emit CheckedIn event on check in", async function () {
      const bookingId = "uniqueBookingID1";
      const tokenURI = "http://example.com/nft1";
      await expect(bookingNFT.connect(owner).checkIn(await addr1.getAddress(), bookingId, tokenURI))
        .to.emit(bookingNFT, "CheckedIn")
        .withArgs(await addr1.getAddress(), ethers.utils.keccak256(ethers.utils.toUtf8Bytes(bookingId)), tokenURI);
    });

    it("Should emit CheckedOut event on check out", async function () {
      const bookingId = "uniqueBookingID1";
      const tokenURI = "http://example.com/nft1";
      await bookingNFT.connect(owner).checkIn(await addr1.getAddress(), bookingId, tokenURI);
      await expect(bookingNFT.connect(owner).checkOut(bookingId))
        .to.emit(bookingNFT, "CheckedOut")
        .withArgs(ethers.utils.keccak256(ethers.utils.toUtf8Bytes(bookingId)));
    });

    it("Should fail if non-owner tries to check in", async function () {
      const bookingId = "uniqueBookingID2";
      const tokenURI = "http://example.com/nft2";
      await expect(bookingNFT.connect(addr1).checkIn(addr1.address, bookingId, tokenURI))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should fail if non-owner tries to check out", async function () {
      const bookingId = "uniqueBookingID2";
      const tokenURI = "http://example.com/nft2";
      await bookingNFT.connect(owner).checkIn(addr1.address, bookingId, tokenURI);
      await expect(bookingNFT.connect(addr1).checkOut(bookingId))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});
