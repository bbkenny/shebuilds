# SheBuilds Project Issues & Tasks

This document outlines all the development tasks needed to build **SheBuilds**, a proof-of-skill NFT platform for women builders in Web3.

---

## 🏗️ Workflow Overviews

### 1. Skill Credentialing Lifecycle
1. **Issuer Onboarding**: Organizations (e.g., coding camps, workshops) are whitelisted as official issuers.
2. **Achievement Verification**: Issuer verifies that a builder has completed a course or project.
3. **NFT Minting**: An NFT is minted to the builder's wallet (ERC-721 or ERC-5192 Soulbound).
4. **Metadata Storage**: Skills, technologies, and level are stored on IPFS and linked via the `tokenURI`.
5. **Talent Discovery**: Recruiters browse builders and verify skills on-chain.

### 2. Recruiter & Portfolio Flow
1. **Public Profile**: Builders share a unique URL showcasing all their verified skill NFTs.
2. **Verification**: Recruiter clicks "Verify" to confirm the NFT is valid and issued by a trusted partner.
3. **Contact**: Recruiters connect directly with builders based on proven skillsets.

---

## 🛠️ Smart Contract Issues (Solidity)

### Phase 1: NFT Core & Standards
- [ ] **Issue #1**: NFT Contract Initialization
  - [ ] Implement `SheBuildsNFT.sol` using ERC-721.
  - [ ] Support `Base` L2 deployment parameters.
  - [ ] Setup `Hardhat Ignition` for contract management.
- [ ] **Issue #2**: Soulbound Token (SBT) Implementation
  - [ ] Implement **ERC-5192** standard for non-transferability.
  - [ ] Override `_update` function to prevent transfers (except minting/burning).
- [ ] **Issue #3**: Issuer Whitelist Management
  - [ ] Implement `IssuerRegistry` logic (Admin only can add/remove issuers).
  - [ ] Create `isIssuer` modifier for the `mint` function.

### Phase 2: Minting & Metadata
- [ ] **Issue #4**: Granular Minting Function
  - [ ] Implement `mintCredential(recipient, metadataHash)` function.
  - [ ] Add `batchMint` support for graduating cohorts.
  - [ ] Emit `CredentialIssued` event with skill category.
- [ ] **Issue #5**: Metadata Structure & Storage
  - [ ] Define on-chain attributes for quick filtering (e.g., `skillCategory`, `proficiency`).
  - [ ] Link to IPFS for extended JSON metadata.

### Phase 3: Security & Governance
- [ ] **Issue #6**: Revocation Mechanism
  - [ ] Implement `revokeCredential` for issuers (in case of error or fraud).
- [ ] **Issue #7**: Security Audit & Review
  - [ ] Integrate `AccessControl` for managing admin and issuer roles.
  - [ ] Add `ReentrancyGuard` and `Pausable` for contract safety.

---

## 💻 Frontend Issues (Next.js)

### Phase 4: Architecture & Web3 Setup
- [ ] **Issue #8**: Next.js App Router Structure
  - [ ] Setup `app/builders`, `app/issuers`, and `app/recruiters` route segments.
  - [ ] Configure Tailwind CSS 4 with custom branding (Vibrant Violet & Neon Teal).
- [ ] **Issue #9**: Blockchain Provider Integration
  - [ ] Setup `Wagmi` with Base Sepolia support.
  - [ ] Integrate `RainbowKit` with custom theme matching the SheBuilds brand.
  - [ ] Build `useNFTMetadata` custom hook for fetching and parsing IPFS JSON.

### Phase 5: Component Development
- [ ] **Issue #10**: Builder Portfolio Dashboard
  - [ ] Build `NFTCard` with 3D hover effects (Framer Motion).
  - [ ] Build `SkillGrid` showing aggregated technology icons.
  - [ ] Implement "Share Portfolio" social sharing utility.
- [ ] **Issue #11**: Issuer Minting Portal
  - [ ] Build `MintingForm` with dynamic attribute inputs.
  - [ ] Build `CSVUploader` for batch cohort minting.
  - [ ] Integrate `Pinata` for automatic metadata IPFS pinning.
- [ ] **Issue #12**: Recruiter Discovery UI
  - [ ] Build `BuilderSearch` with technology filtering (e.g., "Solidity", "React").
  - [ ] Create `VerificationBadge` component for on-chain status checks.

### Phase 6: Design & Animation
- [ ] **Issue #13**: Dynamic SVG Generator
  - [ ] Create a utility to generate visual NFT images based on skill data.
- [ ] **Issue #14**: Polish & Micro-interactions
  - [ ] Add "Claim NFT" animation sequence.
  - [ ] Implement loading skeletons for the NFT gallery.

---

## 🧪 Testing & Quality Assurance

- [ ] **Issue #15**: SBT Transfer Lock Tests
  - [ ] Verify tokens cannot be transferred between user wallets.
- [ ] **Issue #16**: Role-Based Minting Tests
  - [ ] Ensure only whitelisted issuers can mint specific skill credentials.

---

## 🚀 Deployment & CI/CD

- [ ] **Issue #17**: Multi-environment Deployment
  - [ ] Deploy SBT contracts to Base Sepolia for testing.
  - [ ] Verify contract source code on BaseScan.

---

## 📊 Priority Levels

- **P0 (Critical)**: Issues #1, #2, #3, #9, #10
- **P1 (High)**: Issues #4, #8, #11, #12
- **P2 (Medium)**: Issues #5, #6, #13, #15
- **P3 (Low)**: Issues #7, #14, #16, #17

---

**Authored by: bbkenny <jouleself@gmail.com>**
