"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Info, Moon, Sun } from "lucide-react";
import ConectaLogo from "@/components/ConectaLogo";
import InfoModal from "@/components/InfoModal";
import LoginModal from "@/components/LoginModal";
import NavigationBar from "@/components/NavigationBar";
import ChatScreen from "@/components/screens/ChatScreen";
import DiaryScreen from "@/components/screens/DiaryScreen";
import FriendsScreen from "@/components/screens/FriendsScreen";
import HomeScreen from "@/components/screens/HomeScreen";
import PracticeScreen from "@/components/screens/PracticeScreen";
import ProgressScreen from "@/components/screens/ProgressScreen";
import ProfileScreen from "@/components/screens/ProfileScreen";
import { INITIAL_CHAT_MESSAGES } from "@/data/mockData";
import { ActiveView, Message, TabId, UserProfile } from "@/types/conecta";

const THEME_STORAGE_KEY = "conecta_theme";
const THEME_EVENT = "conecta-theme-change";
let memoryTheme: "light" | "dark" = "dark";

function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_EVENT, callback);
  };
}

function getThemeSnapshot(): "light" | "dark" {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      memoryTheme = saved;
    }
  } catch {
    // Fallback em memória quando localStorage estiver bloqueado (ex.: webview/iframe restrito)
  }
  return memoryTheme;
}

function getServerThemeSnapshot(): "light" | "dark" {
  return "dark";
}

function evaluateRisk(text: string): 1 | 2 | 3 {
  const criticalKeywords = [
    "suicid",
    "me matar",
    "tirar minha vida",
    "acabar com minha vida",
    "automutila",
    "cortar meus pulsos",
    "não quero mais viver",
  ];
  const alertKeywords = [
    "não aguento mais",
    "desespero",
    "crise de ansiedade",
    "crise de pânico",
    "sem esperança",
    "vontade de sumir",
    "muita dor",
  ];

  const lower = text.toLowerCase();
  if (criticalKeywords.some((kw) => lower.includes(kw))) return 3;
  if (alertKeywords.some((kw) => lower.includes(kw))) return 2;
  return 1;
}

function formatTimeLabel(): string {
  return new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function fetchAIResponse(userText: string): Promise<string> {
  try {
    const response = await fetch("https://psicologia-rag.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText }),
    });

    const rawText = await response.text();
    let parsed: { text?: string; message?: string; error?: string } | null =
      null;
    try {
      parsed = JSON.parse(rawText) as {
        text?: string;
        message?: string;
        error?: string;
      };
    } catch {
      parsed = null;
    }

    if (!response.ok) {
      const serverReason = parsed?.error || parsed?.message;
      if (serverReason) {
        return `No momento o servidor da IA respondeu: "${serverReason}" (código ${response.status}). Como o serviço externo está temporariamente indisponível, tente novamente em alguns instantes.`;
      }
      return `Desculpe, o servidor da IA retornou erro ${response.status} no momento. Se este for o primeiro acesso no dia, aguarde cerca de 50 segundos para o serviço no Render inicializar e tente novamente.`;
    }

    return parsed?.text || parsed?.message || rawText;
  } catch {
    return "Desculpe, estou tendo dificuldades para me conectar com o servidor no momento. Se este for o primeiro acesso no dia, o servidor pode levar cerca de 50 segundos para inicializar no Render. Poderia tentar novamente em instantes?";
  }
}

export default function ConectaPage() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>("inicio");
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>(INITIAL_CHAT_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);
  const [riskLevel, setRiskLevel] = useState<1 | 2 | 3>(1);
  const nextIdRef = useRef(1);
  const mainScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
  }, [activeView]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    memoryTheme = nextTheme;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Ignora erro caso localStorage não esteja disponível no webview
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  const nextMessageId = () => {
    nextIdRef.current += 1;
    return `msg-${nextIdRef.current}`;
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setActiveView("inicio");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveView("inicio");
    setMessages(INITIAL_CHAT_MESSAGES);
    setRiskLevel(1);
  };

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || isLoading || riskLevel === 3) return;

    const detectedRisk = evaluateRisk(userText);
    if (detectedRisk > riskLevel) {
      setRiskLevel(detectedRisk);
    }

    const userMessage: Message = {
      id: nextMessageId(),
      text: userText,
      sender: "user",
      timeLabel: formatTimeLabel(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    if (detectedRisk === 3) {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: nextMessageId(),
          text: "Identificamos que você pode estar passando por um momento de sofrimento intenso. A sua vida é valiosa. Por favor, entre em contato imediatamente com o Centro de Valorização da Vida pelo número 188 (ligação gratuita no Brasil) ou procure o serviço de emergência hospitalar mais próximo. Este chat foi suspenso para a sua segurança.",
          sender: "ai",
          timeLabel: formatTimeLabel(),
        },
      ]);
      return;
    }

    const aiText = await fetchAIResponse(userText);
    setIsLoading(false);

    setMessages((prev) => [
      ...prev,
      {
        id: nextMessageId(),
        text: aiText,
        sender: "ai",
        timeLabel: formatTimeLabel(),
      },
    ]);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: nextMessageId(),
        text: `Olá${
          currentUser ? `, ${currentUser.name}` : ""
        }! Conversa reiniciada. Como você está se sentindo neste momento?`,
        sender: "ai",
        timeLabel: formatTimeLabel(),
      },
    ]);
    setRiskLevel(1);
  };

  const handleStartPracticeInChat = (prompt: string) => {
    setActiveView("conversa");
    void handleSendMessage(prompt);
  };

  const showBellNotification = () => {
    setToastMessage(
      "Lembrete diário: reserve alguns minutos para respirar e cuidar de você hoje."
    );
    setTimeout(() => setToastMessage(null), 3000);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-slate-100 via-violet-50/50 to-indigo-50 dark:from-[#07081c] dark:via-[#0b0d28] dark:to-[#111338] text-slate-900 dark:text-white transition-colors duration-300">
        <header className="flex items-center justify-between px-5 sm:px-8 py-4 bg-white/80 dark:bg-[#090a22]/85 backdrop-blur-md border-b border-slate-200 dark:border-[#1f224d]">
          <div className="flex items-center gap-3">
            <ConectaLogo size="sm" />
            <div>
              <h1 className="font-bold text-base leading-tight">Conecta</h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Pequenos passos, grandes conquistas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsInfoOpen(true)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-colors text-slate-600 dark:text-slate-300 cursor-pointer"
              title="Sobre o projeto"
            >
              <Info className="w-5 h-5" />
            </button>

            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-[#262958] hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-xs font-medium cursor-pointer"
              title="Alternar modo claro/escuro"
            >
              {theme === "light" ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-violet-600" />
                  <span className="hidden sm:inline">Modo Escuro</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Modo Claro</span>
                </>
              )}
            </button>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 my-auto">
          <LoginModal
            isOpen={true}
            isStandalone={true}
            onLoginSuccess={handleLoginSuccess}
          />
        </main>

        <footer className="py-4 px-6 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-[#1f224d] flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>
            Ambiente Seguro &amp; Sigiloso • Projeto de TCC (13ª Turma de IA)
          </span>
          <span className="hidden sm:inline">•</span>
          <span>IA de Apoio • Não substitui acompanhamento profissional</span>
        </footer>

        <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#f4f5fb] dark:bg-[#07081c] text-slate-900 dark:text-white overflow-hidden transition-colors duration-250">
      {/* Desktop Sidebar (lg+) */}
      <div className="hidden lg:flex">
        <NavigationBar
          activeView={activeView}
          onSelectTab={(tab: TabId) => setActiveView(tab)}
          onOpenChat={() => setActiveView("conversa")}
          onOpenInfo={() => setIsInfoOpen(true)}
          onToggleTheme={toggleTheme}
          onLogout={handleLogout}
          theme={theme}
          currentUser={currentUser}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 min-h-0 flex flex-col overflow-hidden">
        <div
          ref={mainScrollRef}
          className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6"
        >
          <div className="max-w-3xl mx-auto h-full">
            {toastMessage && (
              <div className="mb-4 rounded-2xl border border-violet-300 dark:border-violet-500/40 bg-violet-50 dark:bg-[#1a1d4a] px-4 py-3 text-xs sm:text-sm text-violet-900 dark:text-violet-100 shadow-sm">
                {toastMessage}
              </div>
            )}

            {activeView === "inicio" && (
              <HomeScreen
                onNavigate={setActiveView}
                onShowNotification={showBellNotification}
              />
            )}

            {activeView === "praticar" && (
              <PracticeScreen
                onBack={() => setActiveView("inicio")}
                onStartPracticeInChat={handleStartPracticeInChat}
              />
            )}

            {activeView === "diario" && (
              <DiaryScreen onBack={() => setActiveView("inicio")} />
            )}

            {activeView === "progresso" && (
              <ProgressScreen onBack={() => setActiveView("inicio")} />
            )}

            {activeView === "perfil" && (
              <ProfileScreen
                currentUser={currentUser}
                theme={theme}
                onToggleTheme={toggleTheme}
                onNavigate={setActiveView}
                onOpenInfo={() => setIsInfoOpen(true)}
                onLogout={handleLogout}
              />
            )}

            {activeView === "amigos" && (
              <FriendsScreen onBack={() => setActiveView("inicio")} />
            )}

            {activeView === "conversa" && (
              <ChatScreen
                messages={messages}
                isLoading={isLoading}
                riskLevel={riskLevel}
                theme={theme}
                onBack={() => setActiveView("inicio")}
                onSendMessage={handleSendMessage}
                onResetChat={handleResetChat}
                onToggleTheme={toggleTheme}
                onOpenInfo={() => setIsInfoOpen(true)}
              />
            )}
          </div>
        </div>
      </main>

      {/* Mobile & Tablet Bottom Bar (< lg) */}
      <div className="lg:hidden">
        <NavigationBar
          activeView={activeView}
          onSelectTab={(tab: TabId) => setActiveView(tab)}
          onOpenChat={() => setActiveView("conversa")}
          onOpenInfo={() => setIsInfoOpen(true)}
          onToggleTheme={toggleTheme}
          onLogout={handleLogout}
          theme={theme}
          currentUser={currentUser}
        />
      </div>

      <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </div>
  );
}
