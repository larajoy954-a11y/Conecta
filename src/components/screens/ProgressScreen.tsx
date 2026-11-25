"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Frown,
  Laugh,
  Meh,
  MessageSquareText,
  Smile,
  Sprout,
  Star,
  TrendingUp,
} from "lucide-react";
import { MOOD_OPTIONS, PROGRESS_METRICS } from "@/data/mockData";
import { MoodId } from "@/types/conecta";

interface ProgressScreenProps {
  onBack: () => void;
}

function MetricIcon({
  icon,
}: {
  icon: (typeof PROGRESS_METRICS)[number]["icon"];
}) {
  const cls = "w-5 h-5 text-violet-600 dark:text-[#b1a1ff]";
  switch (icon) {
    case "calendar":
      return <Calendar className={cls} />;
    case "messages":
      return <MessageSquareText className={cls} />;
    case "star":
      return <Star className={cls} />;
    case "trend":
      return <TrendingUp className={cls} />;
  }
}

function MoodFaceIcon({ id, selected }: { id: MoodId; selected: boolean }) {
  const cls = `w-5 h-5 ${
    selected ? "text-white" : "text-slate-600 dark:text-[#c7bcff]"
  }`;
  switch (id) {
    case "triste":
      return <Frown className={cls} />;
    case "cansado":
      return <Meh className={cls} />;
    case "neutro":
      return <Smile className={cls} />;
    case "bem":
      return <Smile className={cls} />;
    case "muito_bem":
      return <Laugh className={cls} />;
  }
}

export default function ProgressScreen({ onBack }: ProgressScreenProps) {
  const [selectedMood, setSelectedMood] = useState<MoodId>("muito_bem");

  return (
    <div className="space-y-4 pb-4">
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
            Seu progresso
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300/80 mt-0.5">
            Você já fez muito. Continue!
          </p>
        </div>
      </header>

      {/* Journey Hero Card */}
      <section className="rounded-3xl border border-slate-200 dark:border-[#2a2d61] bg-white dark:bg-[#121432] p-5 flex items-center gap-4 shadow-xs">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6b52ff]/30 to-[#39308c]/60 border border-violet-400/30 flex items-center justify-center shrink-0">
          <Sprout className="w-8 h-8 text-violet-600 dark:text-[#c7bcff]" />
        </div>
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Sua jornada
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300/85 leading-relaxed">
            Cada esforço conta. Você está construindo uma versão mais forte de
            si mesmo(a).
          </p>
        </div>
      </section>

      {/* 2x2 Metrics Grid */}
      <section className="grid grid-cols-2 gap-3">
        {PROGRESS_METRICS.map((metric) => (
          <div
            key={metric.id}
            className="rounded-2xl border border-slate-200 dark:border-[#262958] bg-white dark:bg-[#121432] p-4 flex items-center gap-3 shadow-xs"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-violet-100 dark:bg-[#222456] border border-violet-200 dark:border-[#343875] flex items-center justify-center shrink-0">
              <MetricIcon icon={metric.icon} />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-300/80 leading-tight">
                {metric.label}
              </p>
              <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight mt-0.5">
                {metric.value}
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-400">
                {metric.subtext}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Mood Tracker Card */}
      <section className="rounded-3xl border border-slate-200 dark:border-[#262958] bg-white dark:bg-[#121432] p-5 space-y-4 shadow-xs">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Seu humor
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300/80 mt-0.5">
            Como você tem se sentido{" "}
            <span className="text-violet-600 dark:text-[#7c8cff]">
              ultimamente?
            </span>
          </p>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {MOOD_OPTIONS.map((mood) => {
            const selected = selectedMood === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all ${
                    selected
                      ? "bg-gradient-to-br from-[#896dff] to-[#5a42eb] shadow-lg shadow-violet-600/35 scale-105"
                      : "bg-slate-100 dark:bg-[#232659] border border-slate-200 dark:border-[#343878] group-hover:border-violet-400/60"
                  }`}
                >
                  <MoodFaceIcon id={mood.id} selected={selected} />
                </div>
                <span
                  className={`text-[10px] sm:text-xs font-medium text-center leading-tight ${
                    selected
                      ? "text-violet-700 dark:text-white font-semibold"
                      : "text-slate-500 dark:text-slate-300/80"
                  }`}
                >
                  {mood.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
