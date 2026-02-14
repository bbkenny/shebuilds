"use client";

import { useWeb3 } from "./context/Web3Context";
import { NFTCard } from "./components/NFTCard";
import { SkillGrid } from "./components/SkillGrid";

const mockCredentials = [
  {
    tokenId: 1,
    skillCategory: "Solidity",
    proficiency: 4,
    issuer: "0x1234567890abcdef1234567890abcdef12345678",
    issuedAt: "Jan 2024",
  },
  {
    tokenId: 2,
    skillCategory: "React",
    proficiency: 5,
    issuer: "0xabcdef1234567890abcdef1234567890abcdef12",
    issuedAt: "Feb 2024",
  },
  {
    tokenId: 3,
    skillCategory: "TypeScript",
    proficiency: 4,
    issuer: "0x1234567890abcdef1234567890abcdef12345678",
    issuedAt: "Dec 2023",
  },
];

const mockSkills = [
  { category: "Solidity", count: 1 },
  { category: "React", count: 1 },
  { category: "TypeScript", count: 1 },
];

export default function Home() {
  const { isConnected, address, connectWallet, disconnectWallet, truncateAddress } = useWeb3();

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-teal-400 flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-teal-400 bg-clip-text text-transparent">
                SheBuilds
              </span>
            </div>

            <div className="flex items-center gap-4">
              {isConnected ? (
                <>
                  <span className="text-sm text-gray-400 font-mono">
                    {address && truncateAddress(address)}
                  </span>
                  <button
                    onClick={disconnectWallet}
                    className="px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <button
                  onClick={connectWallet}
                  className="px-6 py-2 bg-gradient-to-r from-violet-500 to-teal-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-teal-400 bg-clip-text text-transparent">
              Proof of Skill,
            </span>
            <br />
            <span className="text-white">On-Chain Forever</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Earn verifiable skill NFTs for your Web3 achievements. Build your on-chain portfolio and get discovered by recruiters.
          </p>
          {!isConnected && (
            <button
              onClick={connectWallet}
              className="px-8 py-4 bg-gradient-to-r from-violet-500 to-teal-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-violet-500/25"
            >
              Connect Wallet to View Portfolio
            </button>
          )}
        </div>
      </section>

      {/* Portfolio Section */}
      {isConnected && (
        <section className="px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Your Credentials</h2>
              <p className="text-gray-400">Soulbound NFTs proving your verified skills</p>
            </div>

            {/* Skill Grid */}
            <div className="mb-8">
              <SkillGrid skills={mockSkills} />
            </div>

            {/* NFT Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockCredentials.map((credential) => (
                <NFTCard
                  key={credential.tokenId}
                  tokenId={credential.tokenId}
                  skillCategory={credential.skillCategory}
                  proficiency={credential.proficiency}
                  issuer={credential.issuer}
                  issuedAt={credential.issuedAt}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
