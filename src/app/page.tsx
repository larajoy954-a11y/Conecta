"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Brain,
  MoreVertical,
  User,
  Sparkles,
  Moon,
  Sun,
  Info,
  ShieldCheck,
  AlertTriangle,
  X,
  RotateCcw,
  LogIn,
  LogOut,
} from "lucide-react";
import LoginModal from "@/components/LoginModal";

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
};

type UserProfile = {
  name: string;
  email: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Sou o assistente do Conecta. Como você está se sentindo hoje?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [riskLevel, setRiskLevel] = useState<1 | 2 | 3>(1); // 1: Normal, 2: Alerta, 3: Crítico
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Inicializa o tema e o usuário a partir do localStorage
  useEffect(() => {
    // Tema
    const savedTheme = localStorage.getItem("conecta_theme") || localStorage.getItem("psicologia_theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme as "light" | "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }

    // Garante que a tela de login sempre apareça primeiro quando a pessoa entra
    localStorage.removeItem("conecta_user");
    localStorage.removeItem("psicologia_user");
    setCurrentUser(null);
    setIsAuthChecking(false);
  }, []);

  // Alterna o tema Claro / Escuro
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("conecta_theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    setIsMenuOpen(false);
  };

  // Sucesso de login
  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem("conecta_user", JSON.stringify(user));
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: `Bem-vindo(a), ${user.name}! Sou o assistente do Conecta. Como você está se sentindo neste momento?`,
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
  };

  // Logout
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("conecta_user");
    localStorage.removeItem("psicologia_user");
    setIsMenuOpen(false);
  };

  // Auto-scroll para a última mensagem
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Avaliação preliminar de risco ético no diálogo
  const evaluateRisk = (text: string): 1 | 2 | 3 => {
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
    if (criticalKeywords.some((kw) => lower.includes(kw))) {
      return 3;
    }
    if (alertKeywords.some((kw) => lower.includes(kw))) {
      return 2;
    }
    return 1;
  };

  const fetchAIResponse = async (userText: string) => {
    try {
      const response = await fetch("https://psicologia-rag.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok) {
        throw new Error(`Erro na comunicação com a IA: status ${response.status}`);
      }

      const rawText = await response.text();
      try {
        const data = JSON.parse(rawText);
        return data.text || data.message || rawText;
      } catch {
        return rawText;
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Desculpe, estou tendo dificuldades para me conectar com o servidor no momento. Se este for o primeiro acesso no dia, o servidor pode levar cerca de 50 segundos para inicializar no Render. Poderia tentar novamente em instantes?";
    }
  };

  const processUserMessage = async (userText: string) => {
    if (!userText.trim() || isLoading || riskLevel === 3) return;

    const detectedRisk = evaluateRisk(userText);
    if (detectedRisk > riskLevel) {
      setRiskLevel(detectedRisk);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    if (detectedRisk === 3) {
      setIsLoading(false);
      const safetyNotice: Message = {
        id: (Date.now() + 1).toString(),
        text: "Identificamos que você pode estar passando por um momento de sofrimento intenso. A sua vida é valiosa. Por favor, entre em contato imediatamente com o Centro de Valorização da Vida pelo número 188 (ligação gratuita no Brasil) ou procure o serviço de emergência hospitalar mais próximo. Este chat foi suspenso para a sua segurança.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, safetyNotice]);
      return;
    }

    const aiText = await fetchAIResponse(userText);

    setIsLoading(false);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiText,
      sender: "ai",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMessage]);
  };

  const handleSend = () => {
    processUserMessage(input);
  };

  const sendPill = (text: string) => {
    processUserMessage(text);
  };

  const resetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        text: `Olá${currentUser ? `, ${currentUser.name}` : ""}! Conversa reiniciada. Como você está se sentindo hoje?`,
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
    setRiskLevel(1);
    setInput("");
    setIsMenuOpen(false);
  };

  if (isAuthChecking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-400/20 animate-pulse mb-3">
          <Brain className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        </div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
          Carregando Conecta...
        </p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-slate-100 via-blue-50/50 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        {/* Cabeçalho da Tela de Entrada / Login */}
        <header className="flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-400/20">
              <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight">Conecta</h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Assistente de Apoio Emocional
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsInfoOpen(true)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-600 dark:text-slate-300 cursor-pointer"
              title="Sobre o projeto"
            >
              <Info className="w-5 h-5" />
            </button>

            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-medium cursor-pointer"
              title="Alternar modo claro/escuro"
            >
              {theme === "light" ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-blue-600" />
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

        {/* Conteúdo Central: Tela de Login */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 my-auto">
          <LoginModal
            isOpen={true}
            isStandalone={true}
            onLoginSuccess={handleLoginSuccess}
          />
        </main>

        {/* Rodapé da Tela de Login */}
        <footer className="py-4 px-6 text-center text-xs text-slate-400 dark:text-slate-500 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>Ambiente Seguro & Sigiloso • Projeto de TCC (13ª Turma de IA)</span>
          <span className="hidden sm:inline">•</span>
          <span>IA de Apoio • Não substitui acompanhamento profissional</span>
        </footer>

        {/* Modal Informativo (também acessível na tela de login) */}
        {isInfoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
              <button
                onClick={() => setIsInfoOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-xl">
                  <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">Sobre o Conecta</h3>
                  <p className="text-xs text-slate-500">TCC - 13ª Turma de Inteligência Artificial</p>
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
                <p>
                  O <strong>Conecta</strong> é um protótipo de assistente conversacional inteligente projetado para oferecer escuta empática e suporte inicial, utilizando técnicas de RAG (Retrieval-Augmented Generation).
                </p>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl">
                  <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
                    Aviso Ético e Legal:
                  </p>
                  <p className="text-amber-700 dark:text-amber-400">
                    Esta aplicação não realiza diagnósticos e não substitui a consulta com psicólogos ou psiquiatras.
                  </p>
                </div>
                <p>
                  Em situações de emergência ou sofrimento agudo, entre em contato com os serviços públicos de saúde mental ou com o <strong>CVV (188)</strong>.
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsInfoOpen(false)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Compreendido
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between px-6 py-4 bg-slate-800 dark:bg-slate-900 text-white shadow-md border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-400/20">
            <Brain className="w-7 h-7 text-blue-400" />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight">Conecta</h2>
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Ambiente de Apoio Emocional
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Botão de Login / Perfil do Usuário */}
          {currentUser ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-white shadow-xs">
              <div className="w-5 h-5 rounded-full bg-blue-400 text-slate-900 font-bold flex items-center justify-center text-[10px]">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[110px] truncate">{currentUser.name}</span>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-xs font-semibold shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Acesse sua conta"
            >
              <User className="w-3.5 h-3.5" />
              <span>Entrar</span>
            </button>
          )}

          {/* Menu de Configurações */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/80 cursor-pointer"
              title="Menu de opções"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsMenuOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  <div className="py-2">
                    <div className="px-3 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      Opções
                    </div>

                    {/* Alternador de Tema */}
                    <button
                      onClick={toggleTheme}
                      className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200 cursor-pointer text-xs font-medium"
                    >
                      <div className="flex items-center gap-2.5">
                        {theme === "light" ? (
                          <Moon className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Sun className="w-4 h-4 text-amber-400" />
                        )}
                        <span>{theme === "light" ? "Modo Escuro" : "Modo Claro"}</span>
                      </div>
                      <div
                        className={`w-8 h-4.5 px-0.5 rounded-full flex items-center transition-colors duration-300 ${
                          theme === "dark" ? "bg-blue-600" : "bg-slate-300"
                        }`}
                      >
                        <div
                          className={`w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-transform duration-300 ${
                            theme === "dark" ? "translate-x-3.5" : "translate-x-0"
                          }`}
                        ></div>
                      </div>
                    </button>

                    {/* Login / Logout no Menu */}
                    {currentUser ? (
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 transition-colors cursor-pointer text-xs font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sair da Conta ({currentUser.name})</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setIsLoginOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200 cursor-pointer text-xs font-medium"
                      >
                        <LogIn className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Entrar na sua conta</span>
                      </button>
                    )}

                    {/* Reiniciar Conversa */}
                    <button
                      onClick={resetChat}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200 cursor-pointer text-xs font-medium"
                    >
                      <RotateCcw className="w-4 h-4 text-slate-500" />
                      <span>Reiniciar Conversa</span>
                    </button>

                    {/* Informações */}
                    <button
                      onClick={() => {
                        setIsInfoOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200 cursor-pointer text-xs font-medium"
                    >
                      <Info className="w-4 h-4 text-slate-500" />
                      <span>Sobre o Projeto</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Alerta de Nível de Risco 2 ou 3 */}
      {riskLevel === 2 && (
        <div className="bg-amber-50 dark:bg-amber-950/50 border-b border-amber-200 dark:border-amber-900/60 px-4 py-2 text-xs text-amber-800 dark:text-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-3xl mx-auto w-full">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Percebemos sinais de sobrecarga ou estresse. Lembre-se de respirar fundo e que você não está sozinho(a).
            </span>
          </div>
        </div>
      )}

      {riskLevel === 3 && (
        <div className="bg-red-50 dark:bg-red-950/60 border-b border-red-200 dark:border-red-900 px-4 py-3 text-xs text-red-800 dark:text-red-200">
          <div className="flex items-center gap-2 max-w-3xl mx-auto w-full">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            <div>
              <strong>Atenção:</strong> Por motivos de segurança, a conversa automática foi pausada. Se precisar de apoio imediato, ligue gratuitamente para o <strong>CVV (188)</strong> no Brasil ou procure assistência médica de emergência.
            </div>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div
        ref={scrollRef}
        className="flex-grow overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin bg-slate-50 dark:bg-slate-950"
      >
        <div className="max-w-3xl mx-auto space-y-6 pb-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mt-auto shadow-sm shrink-0 ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400"
                  }`}
                >
                  {msg.sender === "user" ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                </div>

                <div
                  className={`px-4 py-3 rounded-2xl text-[14px] md:text-[15px] leading-relaxed break-words whitespace-pre-wrap shadow-sm ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 ml-11 text-slate-400 dark:text-slate-500 text-xs italic">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
              Conecta está digitando...
            </div>
          )}
        </div>
      </div>

      {/* Zona de Ação (Pills + Entrada de Texto) */}
      <div className="w-full p-4 md:p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-lg">
        <div className="max-w-3xl mx-auto flex flex-col">
          {/* Botões de Sugestão Rápida (Pills) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full pb-4">
            {[
              "Preciso desabafar...",
              "Me dê dicas de relaxamento.",
              "Como lidar com o estresse?",
            ].map((text, i) => (
              <button
                key={i}
                onClick={() => sendPill(text)}
                disabled={isLoading || riskLevel === 3}
                className="w-full px-3.5 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all shadow-sm text-center truncate disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {text}
              </button>
            ))}
          </div>

          {/* Barra de Entrada */}
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
              placeholder={
                riskLevel === 3
                  ? "Conversa pausada por segurança"
                  : "Como você está se sentindo? Digite aqui..."
              }
              disabled={isLoading || riskLevel === 3}
              className="w-full pl-4 pr-14 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all disabled:cursor-not-allowed disabled:opacity-60 text-sm md:text-base"
            />

            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading || riskLevel === 3}
              className="absolute right-2.5 bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl shadow-md hover:scale-105 active:scale-95 disabled:opacity-40 disabled:scale-100 transition-all cursor-pointer disabled:cursor-not-allowed"
              title="Enviar mensagem"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 mt-3 font-semibold uppercase tracking-wider">
            Ambiente Seguro & Sigiloso • Projeto de TCC (13ª Turma de IA)
          </p>
        </div>
      </div>

      {/* Selo Flutuante de Responsabilidade Ética */}
      <div className="fixed bottom-24 right-4 pointer-events-none md:pointer-events-auto">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-full shadow-md flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap uppercase tracking-tight">
            IA de Apoio • Não substitui terapia
          </span>
        </div>
      </div>

      {/* Modal de Login (Idêntico ao design fornecido) */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Modal Informativo */}
      {isInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsInfoOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-xl">
                <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">Sobre o Conecta</h3>
                <p className="text-xs text-slate-500">TCC - 13ª Turma de Inteligência Artificial</p>
              </div>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
              <p>
                O <strong>Conecta</strong> é um protótipo de assistente conversacional inteligente projetado para oferecer escuta empática e suporte inicial, utilizando técnicas de RAG (Retrieval-Augmented Generation).
              </p>
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl">
                <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
                  Aviso Ético e Legal:
                </p>
                <p className="text-amber-700 dark:text-amber-400">
                  Esta aplicação não realiza diagnósticos e não substitui a consulta com psicólogos ou psiquiatras.
                </p>
              </div>
              <p>
                Em situações de emergência ou sofrimento agudo, entre em contato com os serviços públicos de saúde mental ou com o <strong>CVV (188)</strong>.
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsInfoOpen(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Compreendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
