import { ethers } from "hardhat";

async function main() {
    console.log("Deploying SheBuilds contract...");

    const SheBuilds = await ethers.getContractFactory("SheBuilds");
    const sheBuilds = await SheBuilds.deploy();

    await sheBuilds.waitForDeployment();

    const address = await sheBuilds.getAddress();
    console.log(`SheBuilds deployed to: ${address}`);

    // Grant issuer role to deployer for testing
    const [deployer] = await ethers.getSigners();
    const ISSUER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("ISSUER_ROLE"));
    await sheBuilds.grantRole(ISSUER_ROLE, deployer.address);
    console.log(`Granted ISSUER_ROLE to deployer: ${deployer.address}`);

    // Example: Mint a test credential
    console.log("\nMinting test credential...");
    const tx = await sheBuilds.mintCredential(
        deployer.address,
        0, // CredentialType.SKILL
        "Solidity Development",
        "Completed advanced Solidity course",
        "ipfs://QmExample123", // Replace with actual IPFS URI
        true // Soulbound
    );
    await tx.wait();
    console.log("Test credential minted!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
