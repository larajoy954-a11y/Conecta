"use client";

import { useState } from "react";
import {
  Atom,
  BarChart3,
  Bell,
  BookOpen,
  ChevronRight,
  Flower2,
  Heart,
  HelpCircle,
  LogOut,
  Moon,
  Settings,
  Shield,
  Sun,
  User,
} from "lucide-react";
import { ActiveView, UserProfile } from "@/types/conecta";

interface ProfileScreenProps {
  currentUser: UserProfile;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onNavigate: (view: ActiveView) => void;
  onOpenInfo: () => void;
  onLogout: () => void;
}

export default function ProfileScreen({
  currentUser,
  theme,
  onToggleTheme,
  onNavigate,
  onOpenInfo,
  onLogout,
}: ProfileScreenProps) {
  const [likedMotivation, setLikedMotivation] = useState(false);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const showTempNotice = (text: string) => {
    setStatusNotice(text);
    setTimeout(() => {
      setStatusNotice(null);
    }, 2800);
  };

  const menuRows = [
    {
      id: "progresso",
      label: "Meu progresso",
      icon: BarChart3,
      action: () => onNavigate("progresso"),
    },
    {
      id: "diario",
      label: "Meu diário",
      icon: BookOpen,
      action: () => onNavigate("diario"),
    },
    {
      id: "privacidade",
      label: "Configurações de privacidade",
      icon: Shield,
      action: () =>
        showTempNotice(
          "Suas conversas não são armazenadas em banco de dados externo neste protótipo."
        ),
    },
    {
      id: "notificacoes",
      label: "Notificações",
      icon: Bell,
      action: () =>
        showTempNotice("Lembretes diários de bem-estar ativados para este dispositivo."),
    },
    {
      id: "ajuda",
      label: "Ajuda e suporte",
      icon: HelpCircle,
      action: onOpenInfo,
    },
  ];

  return (
    <div className="space-y-5 pb-4">
      {/* Header */}
      <header className="flex items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-[#202252] border border-violet-200 dark:border-[#343875] flex items-center justify-center shrink-0">
            <Flower2 className="w-6 h-6 text-violet-600 dark:text-[#b1a1ff]" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              Perfil
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300/80">
              Aqui é o seu espaço.
            </p>
          </div>
        </div>

        <button
          onClick={onToggleTheme}
          title={theme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-[#2a2d61] bg-white dark:bg-[#141638] hover:bg-slate-100 dark:hover:bg-[#1e2152] text-slate-700 dark:text-[#b1a1ff] text-xs font-medium transition-colors cursor-pointer"
        >
          <Settings className="w-4 h-4" />
          {theme === "dark" ? (
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-violet-600" />
          )}
        </button>
      </header>

      {statusNotice && (
        <div className="rounded-2xl border border-violet-300 dark:border-violet-500/40 bg-violet-50 dark:bg-[#1a1d4a] px-4 py-3 text-xs sm:text-sm text-violet-900 dark:text-violet-100">
          {statusNotice}
        </div>
      )}

      {/* Main Profile Card */}
      <section className="rounded-3xl border border-slate-200 dark:border-[#262958] bg-white dark:bg-[#121432] overflow-hidden shadow-xs">
        {/* User Row */}
        <div className="p-4 sm:p-5 flex items-center justify-between gap-3 border-b border-slate-200 dark:border-[#232654]">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-13 h-13 rounded-full bg-violet-100 dark:bg-[#232659] border border-violet-200 dark:border-[#363a7d] flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-violet-600 dark:text-[#b1a1ff]" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                {currentUser.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-300/80 truncate">
                Conectado(a) desde 26 de abr. de 2025
              </p>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
        </div>

        {/* Navigation & Settings Rows */}
        <div className="divide-y divide-slate-100 dark:divide-[#1d204a]">
          {menuRows.map(({ id, label, icon: Icon, action }) => (
            <button
              key={id}
              onClick={action}
              className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3.5">
                <Icon className="w-5 h-5 text-violet-600 dark:text-[#9c87ff]" />
                <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  {label}
                </span>
              </div>
              <ChevronRight className="w-4.5 h-4.5 text-slate-400" />
            </button>
          ))}

          {/* Theme Row */}
          <button
            onClick={onToggleTheme}
            className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3.5">
              {theme === "dark" ? (
                <Moon className="w-5 h-5 text-[#9c87ff]" />
              ) : (
                <Sun className="w-5 h-5 text-amber-500" />
              )}
              <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                Aparência: {theme === "dark" ? "Tema Escuro" : "Tema Claro"}
              </span>
            </div>
            <span className="text-xs font-semibold text-violet-600 dark:text-[#9c87ff]">
              Alternar
            </span>
          </button>

          {/* Logout Row */}
          <button
            onClick={onLogout}
            className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer text-left text-red-600 dark:text-red-400"
          >
            <div className="flex items-center gap-3.5">
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Sair da conta</span>
            </div>
            <ChevronRight className="w-4.5 h-4.5 opacity-60" />
          </button>
        </div>
      </section>

      {/* Motivational Card */}
      <section className="rounded-3xl border border-slate-200 dark:border-[#262958] bg-white dark:bg-[#121432] p-5 flex items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-[#232559] border border-violet-200 dark:border-[#363a7d] flex items-center justify-center shrink-0">
            <Atom className="w-6 h-6 text-violet-600 dark:text-[#b1a1ff]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Você consegue!
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300/80 leading-snug mt-0.5">
              Cada passo, por menor que pareça, te aproxima dos seus objetivos.
            </p>
          </div>
        </div>

        <button
          onClick={() => setLikedMotivation((prev) => !prev)}
          aria-label="Curtir mensagem motivacional"
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              likedMotivation
                ? "text-violet-500 fill-violet-500"
                : "text-slate-400 dark:text-slate-300"
            }`}
          />
        </button>
      </section>
    </div>
  );
}
