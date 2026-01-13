# SheBuilds Smart Contracts

NFT smart contracts for the SheBuilds proof-of-skill platform.

## 📋 Contracts

### SheBuilds.sol
Main NFT contract (ERC-721) that manages:
- **Skill Credentials**: NFTs representing completed courses and skills
- **Project Credentials**: NFTs showcasing completed projects
- **Mentorship Badges**: NFTs for mentorship participation
- **Soulbound Tokens**: Optional non-transferable NFTs
- **Role-Based Minting**: Admin, Issuer, and Mentor roles

## 🔑 Key Features

- **ERC-721 Standard**: Full NFT functionality with metadata
- **Soulbound Option**: Prevent credential trading/transfer
- **Role-Based Access**: 
  - `ADMIN_ROLE`: Manage roles and system configuration
  - `ISSUER_ROLE`: Mint credentials (organizations, bootcamps)
  - `MENTOR_ROLE`: Issue mentorship badges
- **Skill Tracking**: On-chain record of user skills
- **Batch Minting**: Efficiently mint multiple credentials
- **IPFS Metadata**: Store rich credential data off-chain

## 🎨 Credential Types

1. **SKILL (0)**: Represents a learned skill or completed course
2. **PROJECT (1)**: Showcases a completed project
3. **MENTORSHIP (2)**: Recognition for mentorship participation

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Compile Contracts
```bash
npx hardhat compile
```

### Run Tests
```bash
npx hardhat test
```

### Deploy to Local Network
```bash
# Terminal 1: Start local node
npx hardhat node

# Terminal 2: Deploy contracts
npx hardhat run scripts/deploy.ts --network localhost
```

## 📝 Usage Examples

### Mint a Skill Credential
```solidity
sheBuilds.mintSkillCredential(
    recipientAddress,
    "React Development",
    "Completed React Bootcamp 2024",
    "ipfs://QmSkillMetadata...",
    true // soulbound
);
```

### Mint a Project Credential
```solidity
sheBuilds.mintCredential(
    recipientAddress,
    CredentialType.PROJECT,
    "DeFi Dashboard",
    "Built a full-stack DeFi analytics dashboard",
    "ipfs://QmProjectMetadata...",
    false // transferable
);
```

### Batch Mint Credentials
```solidity
sheBuilds.batchMintCredentials(
    [address1, address2, address3],
    CredentialType.SKILL,
    ["Solidity", "Web3.js", "Hardhat"],
    ["desc1", "desc2", "desc3"],
    ["ipfs://uri1", "ipfs://uri2", "ipfs://uri3"],
    true
);
```

### Check User Skills
```solidity
string[] memory skills = sheBuilds.getUserSkills(userAddress);
bool hasReact = sheBuilds.hasSkill(userAddress, "React Development");
```

## 📊 Metadata Structure

IPFS metadata should follow this structure:

```json
{
  "name": "Solidity Development",
  "description": "Completed advanced Solidity course with 40+ hours of training",
  "image": "ipfs://QmImageHash...",
  "attributes": [
    {
      "trait_type": "Credential Type",
      "value": "Skill"
    },
    {
      "trait_type": "Skill Category",
      "value": "Smart Contract Development"
    },
    {
      "trait_type": "Level",
      "value": "Advanced"
    },
    {
      "trait_type": "Issuer",
      "value": "Web3 Academy"
    },
    {
      "trait_type": "Issue Date",
      "value": "2024-01-15"
    },
    {
      "trait_type": "Soulbound",
      "value": "Yes"
    }
  ]
}
```

## 🔒 Soulbound Tokens

Soulbound tokens cannot be transferred after minting:
- Prevents credential trading
- Maintains authenticity
- Ensures achievements stay with the earner
- Can still be burned by the owner

## 🧪 Testing

Run the test suite:
```bash
npx hardhat test
```

For gas reports:
```bash
REPORT_GAS=true npx hardhat test
```

## 🌐 Deployment Networks

- **Local**: Hardhat Network (chainId: 1337)
- **Testnet**: Base Sepolia (recommended for testing)
- **Mainnet**: Base or Polygon (low gas fees)

## 🔐 Security Considerations

- Role-based access control for minting
- Soulbound tokens prevent unauthorized transfers
- IPFS ensures decentralized metadata storage
- All credentials are permanently on-chain

## 📚 Resources

- [OpenZeppelin ERC721](https://docs.openzeppelin.com/contracts/4.x/erc721)
- [ERC-5192 Soulbound Standard](https://eips.ethereum.org/EIPS/eip-5192)
- [IPFS Documentation](https://docs.ipfs.tech/)
- [Hardhat Documentation](https://hardhat.org/docs)
