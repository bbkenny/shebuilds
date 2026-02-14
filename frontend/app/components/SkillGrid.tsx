"use client";

interface SkillGridProps {
  skills: { category: string; count: number }[];
}

const skillIcons: Record<string, string> = {
  Solidity: "⚙️",
  React: "⚛️",
  Rust: "🦀",
  TypeScript: "📘",
  Python: "🐍",
  "Smart Contracts": "📝",
  default: "💎",
};

export function SkillGrid({ skills }: SkillGridProps) {
  return (
    <div className="bg-slate-900/50 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Skill Stack</h2>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.category}
            className="group relative flex flex-col items-center p-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <span className="text-2xl mb-1">
              {skillIcons[skill.category] || skillIcons.default}
            </span>
            <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
              {skill.category}
            </span>
            {skill.count > 1 && (
              <span className="absolute -top-1 -right-1 bg-shebuilds-violet text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {skill.count}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}