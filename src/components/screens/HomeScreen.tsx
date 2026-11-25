"use client";

import {
  ArrowRight,
  Bell,
  BookOpen,
  MessageCircle,
  NotebookPen,
  User,
  Users,
} from "lucide-react";
import ConectaLogo from "@/components/ConectaLogo";
import HeroIllustration from "@/components/HeroIllustration";
import { ActiveView } from "@/types/conecta";

interface HomeScreenProps {
  onNavigate: (view: ActiveView) => void;
  onShowNotification: () => void;
}

export default function HomeScreen({
  onNavigate,
  onShowNotification,
}: HomeScreenProps) {
  const quickActions: {
    id: ActiveView;
    title: string;
    description: string;
    icon: typeof MessageCircle;
  }[] = [
    {
      id: "conversa",
      title: "Conversar",
      description: "Desabafe, troque ideias, faça novas conexões.",
      icon: MessageCircle,
    },
    {
      id: "praticar",
      title: "Praticar",
      description: "Exercícios para melhorar sua comunicação.",
      icon: BookOpen,
    },
    {
      id: "amigos",
      title: "Amigos",
      description: "Encontre pessoas com interesses em comum.",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6 pb-4">
      {/* Top Header */}
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ConectaLogo size="md" />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              Conecta
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300/80">
              Pequenos passos, grandes conquistas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onShowNotification}
            aria-label="Notificações"
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-[#2a2e63] bg-white dark:bg-[#141738] hover:bg-slate-100 dark:hover:bg-[#1e2250] flex items-center justify-center text-slate-600 dark:text-slate-200 transition-colors cursor-pointer"
          >
            <Bell className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={() => onNavigate("perfil")}
            aria-label="Ir para o perfil"
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-[#2a2e63] bg-white dark:bg-[#141738] hover:bg-slate-100 dark:hover:bg-[#1e2250] flex items-center justify-center text-slate-600 dark:text-slate-200 transition-colors cursor-pointer"
          >
            <User className="w-4.5 h-4.5" />
          </button>
        </div>
      </header>

      {/* Hero Banner Card */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-[#2a2d61] bg-[#121436] shadow-xl">
        <div className="absolute inset-0">
          <HeroIllustration />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090b22]/95 via-[#0e1030]/80 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-8 max-w-md space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
            Aqui, você pode
            <br />
            se expressar, sem pressa.
          </h2>
          <p className="text-xs sm:text-sm text-slate-200/85 leading-relaxed">
            Fale sobre o que sente, pratique sua comunicação e construa, aos
            poucos, mais confiança.
          </p>
          <div className="pt-1">
            <button
              onClick={() => onNavigate("conversa")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7658ff] to-[#4f36da] hover:brightness-110 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-violet-600/30 transition-all cursor-pointer active:scale-[0.98]"
            >
              <span>Começar agora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          O que você quer fazer hoje?
        </h3>

        <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
          {quickActions.map(({ id, title, description, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className="group text-left rounded-2xl border border-slate-200 dark:border-[#262958] bg-white dark:bg-[#121432] hover:border-violet-400 dark:hover:border-[#6d4aff]/60 hover:bg-violet-50/40 dark:hover:bg-[#191c45] p-3 sm:p-4 transition-all cursor-pointer flex flex-col items-center text-center shadow-xs"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-violet-100 dark:bg-[#222452] border border-violet-200 dark:border-[#343875] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600 dark:text-[#9c87ff]" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1">
                {title}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 leading-snug line-clamp-3">
                {description}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Daily Journal Prompt Card */}
      <section className="rounded-3xl border border-slate-200 dark:border-[#262958] bg-white dark:bg-[#121432] p-5 sm:p-6 flex items-start gap-4 shadow-xs">
        <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-[#232556] border border-violet-200 dark:border-[#353978] flex items-center justify-center shrink-0">
          <NotebookPen className="w-5 h-5 text-violet-600 dark:text-[#9c87ff]" />
        </div>

        <div className="flex-1 space-y-2.5">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Como foi hoje?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300/80 leading-relaxed">
              Registre sua experiência, mesmo que seja algo pequeno.
            </p>
          </div>

          <button
            onClick={() => onNavigate("diario")}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#7658ff] to-[#4f36da] hover:brightness-110 text-white text-xs sm:text-sm font-semibold shadow-md shadow-violet-600/25 transition-all cursor-pointer active:scale-[0.98]"
          >
            <span>Escrever no diário</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
