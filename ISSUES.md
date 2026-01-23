# 📋 TreaSure Development Issues & Tasks

This file contains all development tasks for the TreaSure project, covering both Smart Contracts and Frontend development.

---

## 🔧 What Needs to Be Done

### 1. Project Foundation & Configuration
- [ ] Create `.env.local` for Frontend with:
  - `NEXT_PUBLIC_REOWN_PROJECT_ID`
  - `NEXT_PUBLIC_BASE_RPC_URL`
- [x] Create .env template for Smart Contracts ✅
  - `PRIVATE_KEY`
  - `BASESCAN_API_KEY`
- [x] Define project vision and architecture in README.md ✅

### 2. Smart Contract Development (Solidity)
- [ ] **Merchant Vaults:**
  - [ ] Implement `TreasuryVault.sol` (ERC-4626 compatible)
  - [ ] Add Multi-signature approval logic for withdrawals
  - [ ] Implement Role-Based Access Control (Owner, Operator, Auditor)
- [ ] **Payroll System:**
  - [ ] Implement `PayrollEngine.sol` for scheduled payouts
  - [ ] Add support for "Streaming Payments" (optional/bonus)
  - [ ] Implement "Proof of Payment" event logging
- [ ] **Factory & Infrastructure:**
  - [ ] Implement `VaultFactory.sol` for permissionless vault deployment
  - [ ] Integrate Chainlink Price Feeds for FX-rate visualization
- [ ] **Testing & Security:**
  - [ ] Write unit tests for Vault logic (>90% coverage)
  - [ ] Write integration tests for Vault-to-Payroll flow
  - [ ] Run Slither/Mythril security analysis

### 3. Frontend Development (Next.js)
- [ ] **Core Setup:**
  - [ ] Configure Wagmi v2 + Reown AppKit for Base/Celo
  - [ ] Implement global `Web3Provider`
  - [ ] Build responsive layout with Sidebar and Header
- [ ] **Merchant Vault Tab:**
  - [ ] Build Vault Overview (Balance, Asset Distribution)
  - [ ] Implement Deposit/Withdrawal interface
  - [ ] Create Signer Management dashboard (Add/Remove members)
  - [ ] Build Transaction History / Audit Trail list
- [ ] **Payroll Tab:**
  - [ ] Build Team Management interface (Add worker address + salary)
  - [ ] Create Payroll Scheduler UI
  - [ ] Implement "Pay All" bulk transaction logic
  - [ ] Build "Proof of Payment" viewer with block explorer links
- [ ] **UX/UI Polish:**
  - [ ] Implement Dark/Light mode support
  - [ ] Add loading skeletons for blockchain data
  - [ ] Success/Error toast notifications

### 4. Integration & Deployment
- [ ] Deploy contracts to Base Sepolia
- [ ] Create `lib/abi/` and `lib/contracts.ts` in frontend
- [ ] Implement custom hooks (`useVault`, `usePayroll`)
- [ ] Setup Subgraph/Indexer for efficient data fetching

---

## 🎯 Priority Order

### Phase 1: MVP Core (Critical)
1. [ ] Smart Contract: Basic `TreasuryVault.sol`
2. [ ] Smart Contract: `VaultFactory.sol`
3. [ ] Frontend: Wallet connection & Vault deployment interface
4. [ ] Frontend: Deposit/Withdraw functionality

### Phase 2: Payroll & Management
1. [ ] Smart Contract: `PayrollEngine.sol`
2. [ ] Frontend: Team management UI
3. [ ] Frontend: Execute payroll flow
4. [ ] Smart Contract: Multi-sig approvals

### Phase 3: Polish & Scaling
1. [ ] Multi-chain support (Base + Celo)
2. [ ] Real-time data indexing
3. [ ] Advanced analytics & PDF payslip generation

---

## 📝 Key Files to Create

### Smart Contracts:
- `contracts/TreasuryVault.sol`
- `contracts/PayrollEngine.sol`
- `contracts/VaultFactory.sol`
- `test/Vault.test.ts`

### Frontend:
- `config/wagmi.ts`
- `context/Web3Provider.tsx`
- `hooks/useVault.ts`
- `components/dashboard/VaultTab.tsx`
- `components/dashboard/PayrollTab.tsx`

---

## 🚀 Getting Started for Contributors

1. Check the **Phase 1** issues above.
2. Fork the repository and create a feature branch (`feat/issue-name`).
3. Ensure you follow the modular commit strategy (commit after finishing logical blocks).
4. Run tests before submitting a PR.

## 💡 Implementation Notes
- **Security:** Funds should ALWAYS originate from the Vault. The Payroll engine should only move funds, never store them separately.
- **Auditable:** Every action (adding a signer, changing a salary) must emit a verifiable event.
- **Trustable:** Use OpenZeppelin standards where possible to minimize risk.
