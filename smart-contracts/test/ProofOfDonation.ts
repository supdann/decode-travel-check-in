import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import { ProofOfDonation } from "../typechain";
import { Signer } from "ethers";
import { namehash } from "ethers/lib/utils";

describe("ProofOfDonation", function () {
  let pod: ProofOfDonation;
  let owner: Signer;
  let authorizer: Signer;
  let donor: Signer;
  let addrs: Signer[];

  beforeEach(async function () {
    [owner, authorizer, donor, ...addrs] = await ethers.getSigners();
    const ProofOfDonation = await ethers.getContractFactory("ProofOfDonation");
    pod = await ProofOfDonation.deploy() as ProofOfDonation;
    await pod.deployed();
    await pod.addAuthorizer(await authorizer.getAddress());
  });

  describe("authorize management", function () {
    it("should add and remove an authorizer", async function () {
      const newAuth = addrs[0];
      await expect(pod.addAuthorizer(await newAuth.getAddress())).to.emit(pod, "AuthorizerAdded");
      await expect(pod.removeAuthorizer(await newAuth.getAddress())).to.emit(pod, "AuthorizerRemoved");
    });
  });

  describe("donations", function () {
    it("should allow a valid donation by the owner", async function () {

      const donationId = "donation123";
      const sqm = 100;
      const toAddress = await donor.getAddress();
      
      const types = ["address", "bytes32"];
      const values = [toAddress, namehash(donationId)];
      const message = ethers.utils.defaultAbiCoder.encode(types, values);
      const hash = ethers.utils.keccak256(message);

      const signature = await owner.signMessage(ethers.utils.arrayify(hash));

      await expect(pod.donate(signature, toAddress, sqm, namehash(donationId), ""))
        .to.emit(pod, "DonationLogged")
        .withArgs(sqm, toAddress, await owner.getAddress(), true);  
    });


    it("should allow a valid donation by non-owner authorizer", async function () {

      const donationId = "donation123";
      const sqm = 100;
      const toAddress = await donor.getAddress();
      
      const types = ["address", "bytes32"];
      const values = [toAddress, namehash(donationId)];
      const message = ethers.utils.defaultAbiCoder.encode(types, values);
      const hash = ethers.utils.keccak256(message);

      const signature = await authorizer.signMessage(ethers.utils.arrayify(hash));

      await expect(pod.donate(signature, toAddress, sqm, namehash(donationId), ""))
        .to.emit(pod, "DonationLogged")
        .withArgs(sqm, toAddress, await authorizer.getAddress(), false);  
    });

    it("should reject unauthorized donations", async function () {
      const donationId = "donation123";
      const sqm = 100;
      const toAddress = await donor.getAddress();
      
      const types = ["address", "bytes32"];
      const values = [toAddress, namehash(donationId)];
      const message = ethers.utils.defaultAbiCoder.encode(types, values);
      const hash = ethers.utils.keccak256(message);

      const signature = await donor.signMessage(ethers.utils.arrayify(hash));

      await expect(pod.donate(signature, toAddress, sqm, namehash(donationId), "")).to.be.revertedWith("ProofOfDonation: Unauthorized signer");
    });
  });
});
