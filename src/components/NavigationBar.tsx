"use client";

import {
  Home,
  MessageCircle,
  BookOpen,
  BarChart3,
  User,
  Sun,
  Moon,
  Info,
  LogOut,
} from "lucide-react";
import ConectaLogo from "@/components/ConectaLogo";
import { ActiveView, TabId, UserProfile } from "@/types/conecta";

interface NavigationBarProps {
  activeView: ActiveView;
  onSelectTab: (tab: TabId) => void;
  onOpenChat: () => void;
  onOpenInfo: () => void;
  onToggleTheme: () => void;
  onLogout: () => void;
  theme: "light" | "dark";
  currentUser: UserProfile;
}

const NAV_ITEMS: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: "inicio", label: "Início", icon: Home },
  { id: "praticar", label: "Praticar", icon: MessageCircle },
  { id: "diario", label: "Diário", icon: BookOpen },
  { id: "progresso", label: "Progresso", icon: BarChart3 },
  { id: "perfil", label: "Perfil", icon: User },
];

export default function NavigationBar({
  activeView,
  onSelectTab,
  onOpenChat,
  onOpenInfo,
  onToggleTheme,
  onLogout,
  theme,
  currentUser,
}: NavigationBarProps) {
  const isTabActive = (id: TabId) => {
    if (activeView === id) return true;
    if (activeView === "amigos" && id === "inicio") return true;
    return false;
  };

  return (
    <>
      {/* Desktop Left Sidebar (lg+) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 border-r border-slate-200/80 dark:border-[#1f224d] bg-white/80 dark:bg-[#0a0b24]/95 backdrop-blur-md p-5 justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-1">
            <ConectaLogo size="md" />
            <div>
              <h1 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">
                Conecta
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Pequenos passos, grandes conquistas
              </p>
            </div>
          </div>

          <button
            onClick={onOpenChat}
            className={`w-full py-3 px-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
              activeView === "conversa"
                ? "bg-gradient-to-r from-[#7658ff] to-[#4e34d8] text-white shadow-violet-600/30"
                : "bg-violet-600/10 dark:bg-[#191b42] hover:bg-violet-600/20 dark:hover:bg-[#232659] text-violet-700 dark:text-violet-200 border border-violet-500/20"
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Conversar com a IA</span>
          </button>

          <nav className="space-y-1.5" aria-label="Navegação principal">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
              const active = isTabActive(id);
              return (
                <button
                  key={id}
                  onClick={() => onSelectTab(id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    active
                      ? "bg-gradient-to-r from-[#6f52ff]/15 to-[#4e34d8]/10 text-violet-700 dark:text-white border border-violet-500/30 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      active
                        ? "text-violet-600 dark:text-[#866dff]"
                        : "text-slate-400 dark:text-slate-400"
                    }`}
                  />
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-200/80 dark:border-[#1f224d]">
          <div className="flex items-center gap-2.5 px-2 py-1.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7b61ff] to-[#4b35d6] text-white font-bold flex items-center justify-center text-xs shrink-0">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                {currentUser.name}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {currentUser.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onToggleTheme}
              title={theme === "dark" ? "Modo Claro" : "Modo Escuro"}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-slate-100 dark:bg-[#141638] hover:bg-slate-200 dark:hover:bg-[#1d2050] text-slate-700 dark:text-slate-300 text-xs font-medium cursor-pointer transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-violet-600" />
              )}
              <span>{theme === "dark" ? "Claro" : "Escuro"}</span>
            </button>

            <button
              onClick={onOpenInfo}
              title="Sobre o Conecta"
              className="p-2 rounded-xl bg-slate-100 dark:bg-[#141638] hover:bg-slate-200 dark:hover:bg-[#1d2050] text-slate-600 dark:text-slate-300 cursor-pointer transition-colors"
            >
              <Info className="w-4 h-4" />
            </button>

            <button
              onClick={onLogout}
              title="Sair da conta"
              className="p-2 rounded-xl bg-slate-100 dark:bg-[#141638] hover:bg-red-50 dark:hover:bg-red-950/50 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 cursor-pointer transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile & Tablet Bottom Navigation (< lg) */}
      <nav
        aria-label="Barra inferior"
        className="lg:hidden shrink-0 border-t border-slate-200 dark:border-[#1e214a] bg-white/95 dark:bg-[#090a22]/95 backdrop-blur-md px-2 py-2"
      >
        <div className="max-w-lg mx-auto grid grid-cols-5 gap-1">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const active = isTabActive(id);
            return (
              <button
                key={id}
                onClick={() => onSelectTab(id)}
                className={`flex flex-col items-center justify-center gap-1 py-1.5 rounded-xl transition-all cursor-pointer ${
                  active
                    ? "text-violet-600 dark:text-[#866dff]"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    active ? "scale-105" : ""
                  }`}
                />
                <span className="text-[11px] font-medium leading-none">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
