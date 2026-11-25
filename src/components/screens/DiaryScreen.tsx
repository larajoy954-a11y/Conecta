"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Clock,
  NotebookPen,
  X,
} from "lucide-react";
import { DIARY_ENTRIES } from "@/data/mockData";
import { DiaryEntry, DiaryPeriod } from "@/types/conecta";

interface DiaryScreenProps {
  onBack: () => void;
}

const PERIODS: DiaryPeriod[] = ["Todos", "Hoje", "Esta semana", "Este mês"];

export default function DiaryScreen({ onBack }: DiaryScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<DiaryPeriod>("Todos");
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  const visibleEntries =
    selectedPeriod === "Todos"
      ? DIARY_ENTRIES
      : DIARY_ENTRIES.filter((entry) => entry.period === selectedPeriod);

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
            Diário
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300/80 mt-0.5">
            Seus pensamentos importam.
          </p>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {PERIODS.map((period) => {
          const active = selectedPeriod === period;
          return (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                active
                  ? "bg-gradient-to-r from-[#7658ff] to-[#4f36da] text-white shadow-md shadow-violet-600/25"
                  : "bg-white dark:bg-[#131538] border border-slate-200 dark:border-[#262958] text-slate-600 dark:text-slate-300 hover:border-violet-400/50"
              }`}
            >
              {period}
            </button>
          );
        })}
      </div>

      {/* Registrar no diário CTA Card */}
      <section className="rounded-3xl border border-slate-200 dark:border-[#262958] bg-white dark:bg-[#121432] p-5 flex items-start gap-4 shadow-xs">
        <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-[#232559] border border-violet-200 dark:border-[#363a7d] flex items-center justify-center shrink-0">
          <NotebookPen className="w-5 h-5 text-violet-600 dark:text-[#b1a1ff]" />
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Registrar no diário
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300/80 leading-relaxed mt-0.5">
              Escreva o que está sentindo, o que te incomodou ou o que te fez
              bem.
            </p>
          </div>

          <button
            onClick={() => setIsComposerOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7658ff] to-[#4f36da] hover:brightness-110 text-white text-xs sm:text-sm font-semibold shadow-md shadow-violet-600/25 transition-all cursor-pointer active:scale-[0.98]"
          >
            <span>Novo registro</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Últimos registros */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Últimos registros
          </h3>
          <button
            onClick={() => setSelectedPeriod("Todos")}
            className="text-xs font-medium text-violet-600 dark:text-slate-300 hover:underline cursor-pointer"
          >
            Ver todos
          </button>
        </div>

        <div className="space-y-3">
          {visibleEntries.map((entry) => (
            <button
              key={entry.id}
              onClick={() => setSelectedEntry(entry)}
              className="w-full text-left rounded-2xl border border-slate-200 dark:border-[#262958] bg-white dark:bg-[#121432] hover:border-violet-400 dark:hover:border-[#6d4aff]/60 hover:bg-violet-50/30 dark:hover:bg-[#181b42] p-4 flex items-center justify-between gap-3 transition-all cursor-pointer shadow-xs"
            >
              <div className="space-y-2 min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {entry.dateLabel}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-[#232559] border border-violet-200 dark:border-[#363a7d] text-[11px] font-medium text-violet-700 dark:text-violet-200">
                    <Clock className="w-3 h-3" />
                    {entry.tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300/85 leading-relaxed">
                  {entry.preview}
                </p>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
            </button>
          ))}
        </div>
      </section>

      {/* Entry Reader Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
          <div
            className="fixed inset-0"
            onClick={() => setSelectedEntry(null)}
          />
          <div className="relative z-10 bg-white dark:bg-[#121432] border border-slate-200 dark:border-[#2a2d61] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedEntry(null)}
              aria-label="Fechar registro"
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-[#232559] text-xs font-medium text-violet-700 dark:text-violet-200">
                {selectedEntry.tag}
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-1">
                {selectedEntry.dateLabel}
              </h3>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedEntry.fullText}
            </p>
          </div>
        </div>
      )}

      {/* New Entry Static Preview Modal */}
      {isComposerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
          <div
            className="fixed inset-0"
            onClick={() => setIsComposerOpen(false)}
          />
          <div className="relative z-10 bg-white dark:bg-[#121432] border border-slate-200 dark:border-[#2a2d61] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setIsComposerOpen(false)}
              aria-label="Fechar novo registro"
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Novo registro no diário
            </h3>
            <textarea
              rows={4}
              placeholder="Escreva aqui como você está se sentindo hoje..."
              className="w-full rounded-2xl border border-slate-200 dark:border-[#2e326b] bg-slate-50 dark:bg-[#0b0d24] p-3.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsComposerOpen(false)}
                className="px-4 py-2 rounded-full border border-slate-200 dark:border-[#2e326b] text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => setIsComposerOpen(false)}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#7658ff] to-[#4f36da] text-white text-xs font-semibold cursor-pointer"
              >
                Concluir visualização
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
