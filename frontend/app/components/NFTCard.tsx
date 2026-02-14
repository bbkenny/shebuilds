"use client";

import { useState } from "react";

interface NFTCardProps {
  tokenId: number;
  skillCategory: string;
  proficiency: number;
  issuer: string;
  issuedAt: string;
  revoked?: boolean;
}

export function NFTCard({
  tokenId,
  skillCategory,
  proficiency,
  issuer,
  issuedAt,
  revoked = false,
}: NFTCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const proficiencyStars = Array.from({ length: 5 }, (_, i) => ({
    filled: i < proficiency,
  }));

  const skillColors: Record<string, string> = {
    Solidity: "from-purple-500 to-indigo-600",
    React: "from-cyan-400 to-blue-500",
    Rust: "from-orange-400 to-red-500",
    TypeScript: "from-blue-400 to-blue-600",
    Python: "from-green-400 to-teal-500",
    "Smart Contracts": "from-violet-500 to-purple-600",
    default: "from-pink-500 to-violet-500",
  };

  const gradientClass =
    skillColors[skillCategory] || skillColors.default;

  return (
    <div
      className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
        isHovered ? "transform scale-105 shadow-2xl" : "shadow-lg"
      } ${revoked ? "opacity-50 grayscale" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`h-32 bg-gradient-to-br ${gradientClass} flex items-center justify-center`}
      >
        <div className="text-center">
          <span className="text-4xl font-bold text-white drop-shadow-lg">
            {skillCategory.substring(0, 2).toUpperCase()}
          </span>
          {revoked && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
              Revoked
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-900 p-4">
        <h3 className="text-lg font-bold text-white mb-2">
          {skillCategory}
        </h3>

        <div className="flex gap-1 mb-3">
          {proficiencyStars.map((star, i) => (
            <span
              key={i}
              className={`text-lg ${
                star.filled ? "text-yellow-400" : "text-gray-600"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <div className="text-sm text-gray-400 space-y-1">
          <p>Token ID: #{tokenId}</p>
          <p>Issuer: {issuer.substring(0, 6)}...{issuer.substring(issuer.length - 4)}</p>
          <p>Issued: {issuedAt}</p>
        </div>

        <div
          className={`absolute inset-0 bg-gradient-to-t from-shebuilds-teal/20 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}