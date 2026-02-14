import { expect } from "chai";
import { ethers } from "hardhat";
import { SheBuildsNFT } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("SheBuildsNFT", function () {
  let nft: SheBuildsNFT;
  let admin: HardhatEthersSigner;
  let issuer: HardhatEthersSigner;
  let recipient: HardhatEthersSigner;
  let other: HardhatEthersSigner;

  const ISSUER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("ISSUER_ROLE"));
  const ADMIN_ROLE = ethers.keccak256(ethers.toUtf8Bytes("ADMIN_ROLE"));

  beforeEach(async function () {
    [admin, issuer, recipient, other] = await ethers.getSigners();

    const SheBuildsNFTFactory = await ethers.getContractFactory("SheBuildsNFT");
    nft = await SheBuildsNFTFactory.deploy(admin.address);
    await nft.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct admin role", async function () {
      expect(await nft.hasRole(ADMIN_ROLE, admin.address)).to.be.true;
    });

    it("Should set admin as default issuer", async function () {
      expect(await nft.hasRole(ISSUER_ROLE, admin.address)).to.be.true;
    });

    it("Should have correct name and symbol", async function () {
      expect(await nft.name()).to.equal("SheBuilds Skill NFT");
      expect(await nft.symbol()).to.equal("SBSNFT");
    });
  });

  describe("Issuer Management", function () {
    it("Should allow admin to grant issuer role", async function () {
      await nft.connect(admin).grantIssuerRole(issuer.address);
      expect(await nft.hasRole(ISSUER_ROLE, issuer.address)).to.be.true;
    });

    it("Should allow admin to revoke issuer role", async function () {
      await nft.connect(admin).grantIssuerRole(issuer.address);
      await nft.connect(admin).revokeIssuerRole(issuer.address);
      expect(await nft.hasRole(ISSUER_ROLE, issuer.address)).to.be.false;
    });

    it("Should not allow non-admin to grant issuer role", async function () {
      await expect(
        nft.connect(other).grantIssuerRole(issuer.address)
      ).to.be.reverted;
    });
  });

  describe("Credential Minting", function () {
    beforeEach(async function () {
      await nft.connect(admin).grantIssuerRole(issuer.address);
    });

    it("Should mint credential successfully", async function () {
      const tx = await nft
        .connect(issuer)
        .mintCredential(recipient.address, "Solidity", 4, "ipfs://test");

      const receipt = await tx.wait();
      const event = receipt?.logs.find(
        (log: { topic: string }) => log.topic === nft.interface.getEvent("CredentialIssued")?.topicHash
      );

      expect(event).to.exist;
      expect(await nft.ownerOf(0)).to.equal(recipient.address);
    });

    it("Should store correct credential data", async function () {
      await nft
        .connect(issuer)
        .mintCredential(recipient.address, "React", 5, "ipfs://react");

      const cred = await nft.getCredential(0);
      expect(cred.skillCategory).to.equal("React");
      expect(cred.proficiency).to.equal(5);
      expect(cred.issuer).to.equal(issuer.address);
      expect(cred.revoked).to.be.false;
    });

    it("Should reject invalid proficiency level", async function () {
      await expect(
        nft.connect(issuer).mintCredential(recipient.address, "Test", 6, "ipfs://test")
      ).to.be.revertedWithCustomError(nft, "InvalidProficiency");
    });

    it("Should not allow non-issuer to mint", async function () {
      await expect(
        nft.connect(other).mintCredential(recipient.address, "Test", 3, "ipfs://test")
      ).to.be.reverted;
    });
  });

  describe("Batch Minting", function () {
    beforeEach(async function () {
      await nft.connect(admin).grantIssuerRole(issuer.address);
    });

    it("Should mint multiple credentials at once", async function () {
      const recipients = [recipient.address, other.address];
      const categories = ["Solidity", "React"];
      const proficiencies = [4, 5];
      const uris = ["ipfs://solidity", "ipfs://react"];

      const tx = await nft
        .connect(issuer)
        .batchMintCredentials(recipients, categories, proficiencies, uris);

      await tx.wait();

      expect(await nft.ownerOf(0)).to.equal(recipient.address);
      expect(await nft.ownerOf(1)).to.equal(other.address);
      expect(await nft.totalSupply()).to.equal(2);
    });

    it("Should revert on array length mismatch", async function () {
      const recipients = [recipient.address, other.address];
      const categories = ["Solidity"];
      const proficiencies = [4, 5];
      const uris = ["ipfs://solidity", "ipfs://react"];

      await expect(
        nft.connect(issuer).batchMintCredentials(recipients, categories, proficiencies, uris)
      ).to.be.revertedWith("Array length mismatch");
    });
  });

  describe("Soulbound Transfer Lock", function () {
    beforeEach(async function () {
      await nft.connect(admin).grantIssuerRole(issuer.address);
      await nft
        .connect(issuer)
        .mintCredential(recipient.address, "Solidity", 4, "ipfs://test");
    });

    it("Should prevent transfer of soulbound token", async function () {
      await expect(
        nft.connect(recipient).transferFrom(recipient.address, other.address, 0)
      ).to.be.revertedWithCustomError(nft, "TokenIsSoulbound");
    });

    it("Should emit SoulboundTransferAttempt event on transfer attempt", async function () {
      await expect(
        nft.connect(recipient).transferFrom(recipient.address, other.address, 0)
      ).to.emit(nft, "SoulboundTransferAttempt");
    });
  });

  describe("Credential Revocation", function () {
    beforeEach(async function () {
      await nft.connect(admin).grantIssuerRole(issuer.address);
      await nft
        .connect(issuer)
        .mintCredential(recipient.address, "Solidity", 4, "ipfs://test");
    });

    it("Should allow issuer to revoke credential", async function () {
      await nft.connect(issuer).revokeCredential(0, "Fraud detected");

      const cred = await nft.getCredential(0);
      expect(cred.revoked).to.be.true;
    });

    it("Should not allow non-issuer to revoke", async function () {
      await expect(
        nft.connect(other).revokeCredential(0, "Test")
      ).to.be.revertedWithCustomError(nft, "NotAuthorized");
    });

    it("Should not allow revoking already revoked credential", async function () {
      await nft.connect(issuer).revokeCredential(0, "First revocation");

      await expect(
        nft.connect(issuer).revokeCredential(0, "Second revocation")
      ).to.be.revertedWithCustomError(nft, "TokenAlreadyRevoked");
    });
  });

  describe("View Functions", function () {
    beforeEach(async function () {
      await nft.connect(admin).grantIssuerRole(issuer.address);
    });

    it("Should return correct credentials by owner", async function () {
      await nft
        .connect(issuer)
        .mintCredential(recipient.address, "Solidity", 4, "ipfs://s");
      await nft
        .connect(issuer)
        .mintCredential(recipient.address, "React", 5, "ipfs://r");
      await nft
        .connect(issuer)
        .mintCredential(other.address, "Python", 3, "ipfs://p");

      const tokens = await nft.getCredentialsByOwner(recipient.address);
      expect(tokens.length).to.equal(2);
      expect(tokens[0]).to.equal(0);
      expect(tokens[1]).to.equal(1);
    });

    it("Should return correct total supply", async function () {
      expect(await nft.totalSupply()).to.equal(0);

      await nft
        .connect(issuer)
        .mintCredential(recipient.address, "Solidity", 4, "ipfs://s");
      expect(await nft.totalSupply()).to.equal(1);

      await nft
        .connect(issuer)
        .mintCredential(recipient.address, "React", 5, "ipfs://r");
      expect(await nft.totalSupply()).to.equal(2);
    });
  });
});