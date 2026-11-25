"use client";

import { useState } from "react";
import { ArrowLeft, Check, Users } from "lucide-react";
import { FRIEND_GROUPS } from "@/data/mockData";

interface FriendsScreenProps {
  onBack: () => void;
}

export default function FriendsScreen({ onBack }: FriendsScreenProps) {
  const [joinedIds, setJoinedIds] = useState<string[]>([]);

  const toggleJoin = (id: string) => {
    setJoinedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-5 pb-4">
      <header className="relative flex items-center justify-center pt-1">
        <button
          onClick={onBack}
          aria-label="Voltar para início"
          className="absolute left-0 p-2 rounded-xl text-slate-700 dark:text-white hover:bg-slate-200/70 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Amigos
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300/80 mt-0.5">
            Encontre pessoas com interesses em comum.
          </p>
        </div>
      </header>

      <div className="space-y-3">
        {FRIEND_GROUPS.map((group) => {
          const joined = joinedIds.includes(group.id);
          return (
            <div
              key={group.id}
              className="rounded-2xl border border-slate-200 dark:border-[#262958] bg-white dark:bg-[#121432] p-4 flex items-center justify-between gap-4 shadow-xs"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-[#232559] border border-violet-200 dark:border-[#363a7d] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-violet-600 dark:text-[#b1a1ff]" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {group.name}
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-violet-100 dark:bg-[#232559] text-[11px] font-medium text-violet-700 dark:text-violet-200">
                      {group.topic}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300/80 leading-snug">
                    {group.description}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {group.members} participantes
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleJoin(group.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer inline-flex items-center gap-1 ${
                  joined
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30"
                    : "bg-gradient-to-r from-[#7658ff] to-[#4f36da] text-white shadow-md shadow-violet-600/20"
                }`}
              >
                {joined && <Check className="w-3.5 h-3.5" />}
                <span>{joined ? "Participando" : "Participar"}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
