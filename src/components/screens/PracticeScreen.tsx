"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Ear,
  MessageSquareMore,
  Star,
  User,
  Users,
  X,
} from "lucide-react";
import { PRACTICE_ITEMS } from "@/data/mockData";
import { PracticeCategory, PracticeItem } from "@/types/conecta";

interface PracticeScreenProps {
  onBack: () => void;
  onStartPracticeInChat: (prompt: string) => void;
}

const CATEGORIES: PracticeCategory[] = [
  "Todos",
  "Conversação",
  "Escuta",
  "Autoconfiança",
];

function PracticeIcon({ icon }: { icon: PracticeItem["icon"] }) {
  const cls = "w-6 h-6 text-violet-600 dark:text-[#b1a1ff]";
  switch (icon) {
    case "message":
      return <MessageSquareMore className={cls} />;
    case "ear":
      return <Ear className={cls} />;
    case "user":
      return <User className={cls} />;
    case "users":
      return <Users className={cls} />;
    case "star":
      return <Star className={cls} />;
  }
}

export default function PracticeScreen({
  onBack,
  onStartPracticeInChat,
}: PracticeScreenProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<PracticeCategory>("Todos");
  const [activeExercise, setActiveExercise] = useState<PracticeItem | null>(
    null
  );

  const filteredItems =
    selectedCategory === "Todos"
      ? PRACTICE_ITEMS
      : PRACTICE_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-5 pb-4">
      {/* Header */}
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
            Praticar
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300/80 mt-0.5">
            Pequenos exercícios, grandes avanços.
          </p>
        </div>
      </header>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((category) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                active
                  ? "bg-gradient-to-r from-[#7658ff] to-[#4f36da] text-white shadow-md shadow-violet-600/25"
                  : "bg-white dark:bg-[#131538] border border-slate-200 dark:border-[#262958] text-slate-600 dark:text-slate-300 hover:border-violet-400/50"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Exercise Cards */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveExercise(item)}
            className="w-full text-left rounded-2xl border border-slate-200 dark:border-[#262958] bg-white dark:bg-[#121432] hover:border-violet-400 dark:hover:border-[#6d4aff]/60 hover:bg-violet-50/30 dark:hover:bg-[#181b42] p-4 flex items-center gap-4 transition-all cursor-pointer shadow-xs"
          >
            <div className="w-13 h-13 rounded-full bg-violet-100 dark:bg-[#232559] border border-violet-200 dark:border-[#363a7d] flex items-center justify-center shrink-0">
              <PracticeIcon icon={item.icon} />
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {item.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300/80 leading-snug">
                {item.description}
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                <Clock className="w-3.5 h-3.5 text-violet-600 dark:text-[#9c87ff]" />
                <span>{item.duration}</span>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-400 shrink-0" />
          </button>
        ))}
      </div>

      {/* Static Exercise Preview Modal */}
      {activeExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
          <div
            className="fixed inset-0"
            onClick={() => setActiveExercise(null)}
          />
          <div className="relative z-10 bg-white dark:bg-[#121432] border border-slate-200 dark:border-[#2a2d61] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setActiveExercise(null)}
              aria-label="Fechar exercício"
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-[#232559] border border-violet-200 dark:border-[#363a7d] flex items-center justify-center">
                <PracticeIcon icon={activeExercise.icon} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {activeExercise.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Duração estimada: {activeExercise.duration}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeExercise.description} Você pode praticar este roteiro em
              tempo real com o assistente do Conecta no seu ritmo.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveExercise(null)}
                className="px-4 py-2 rounded-full border border-slate-200 dark:border-[#2e326b] text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  const prompt = activeExercise.promptStarter;
                  setActiveExercise(null);
                  onStartPracticeInChat(prompt);
                }}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#7658ff] to-[#4f36da] hover:brightness-110 text-white text-xs font-semibold shadow-md shadow-violet-600/25 cursor-pointer"
              >
                Praticar na Conversa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
