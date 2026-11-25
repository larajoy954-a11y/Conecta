"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCheck,
  Heart,
  Info,
  Lightbulb,
  Moon,
  MoreVertical,
  Plus,
  RotateCcw,
  Send,
  Sun,
} from "lucide-react";
import { QUICK_CHAT_PILLS } from "@/data/mockData";
import { Message } from "@/types/conecta";

interface ChatScreenProps {
  messages: Message[];
  isLoading: boolean;
  riskLevel: 1 | 2 | 3;
  theme: "light" | "dark";
  onBack: () => void;
  onSendMessage: (text: string) => void;
  onResetChat: () => void;
  onToggleTheme: () => void;
  onOpenInfo: () => void;
}

export default function ChatScreen({
  messages,
  isLoading,
  riskLevel,
  theme,
  onBack,
  onSendMessage,
  onResetChat,
  onToggleTheme,
  onOpenInfo,
}: ChatScreenProps) {
  const [input, setInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showQuickPills, setShowQuickPills] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = () => {
    if (!input.trim() || isLoading || riskLevel === 3) return;
    const text = input;
    setInput("");
    setShowQuickPills(false);
    onSendMessage(text);
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <header className="shrink-0 flex items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-[#1f224f]">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBack}
            aria-label="Voltar para início"
            className="p-2 rounded-xl text-slate-700 dark:text-white hover:bg-slate-200/70 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
              Conversa
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-300/80 truncate">
              Fale sobre o que sente. Aqui você é ouvido(a).
            </p>
          </div>
        </div>

        {/* Menu de opções */}
        <div className="relative shrink-0">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Opções da conversa"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#141638] border border-slate-200 dark:border-[#2a2d61] rounded-2xl shadow-2xl z-50 overflow-hidden py-1.5">
                <button
                  onClick={() => {
                    onResetChat();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-3.5 py-2.5 flex items-center gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-violet-600 dark:text-[#9c87ff]" />
                  <span>Reiniciar conversa</span>
                </button>
                <button
                  onClick={() => {
                    onToggleTheme();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-3.5 py-2.5 flex items-center gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-violet-600" />
                  )}
                  <span>
                    {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
                  </span>
                </button>
                <button
                  onClick={() => {
                    onOpenInfo();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-3.5 py-2.5 flex items-center gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                >
                  <Info className="w-4 h-4 text-slate-400" />
                  <span>Sobre o Conecta</span>
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Banners de Risco Ético */}
      {riskLevel === 2 && (
        <div className="mt-3 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 px-4 py-2.5 text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            Percebemos sinais de sobrecarga ou estresse. Lembre-se de respirar
            fundo e que você não está sozinho(a).
          </span>
        </div>
      )}

      {riskLevel === 3 && (
        <div className="mt-3 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 px-4 py-3 text-xs text-red-800 dark:text-red-200 flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <strong>Atenção:</strong> Por motivos de segurança, a conversa
            automática foi pausada. Se precisar de apoio imediato, ligue
            gratuitamente para o <strong>CVV (188)</strong> no Brasil ou procure
            assistência médica de emergência.
          </div>
        </div>
      )}

      {/* Área de Mensagens */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto py-4 space-y-4 pr-1"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2.5 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "ai" && (
              <div className="w-9 h-9 rounded-full bg-violet-100 dark:bg-[#232559] border border-violet-200 dark:border-[#363a7d] flex items-center justify-center shrink-0 mb-1">
                <Heart className="w-4 h-4 text-violet-600 dark:text-[#b1a1ff] fill-current" />
              </div>
            )}

            <div
              className={`max-w-[82%] sm:max-w-[72%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-xs ${
                msg.sender === "user"
                  ? "bg-gradient-to-br from-[#373fa8] to-[#2e3590] text-white rounded-br-sm"
                  : "bg-white dark:bg-[#141638] border border-slate-200 dark:border-[#262958] text-slate-800 dark:text-slate-100 rounded-bl-sm"
              }`}
            >
              <p className="whitespace-pre-wrap break-words">{msg.text}</p>
              <div
                className={`mt-1.5 flex items-center gap-1 text-[10px] ${
                  msg.sender === "user"
                    ? "justify-end text-indigo-200/80"
                    : "justify-start text-slate-400 dark:text-slate-400"
                }`}
              >
                <span>{msg.timeLabel}</span>
                {msg.sender === "user" && (
                  <CheckCheck className="w-3.5 h-3.5 text-[#76a9ff]" />
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400 text-xs italic pl-1">
            <div className="w-9 h-9 rounded-full bg-violet-100 dark:bg-[#232559] border border-violet-200 dark:border-[#363a7d] flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 text-violet-600 dark:text-[#b1a1ff]" />
            </div>
            <div className="flex items-center gap-1.5 bg-white dark:bg-[#141638] border border-slate-200 dark:border-[#262958] rounded-2xl px-4 py-2.5">
              <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce [animation-delay:0.15s]" />
              <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce [animation-delay:0.3s]" />
              <span className="ml-1">Conecta está digitando...</span>
            </div>
          </div>
        )}

        {/* Card "Lembre-se:" igual à referência */}
        <div className="pt-2">
          <div className="rounded-3xl border border-slate-200 dark:border-[#262958] bg-white dark:bg-[#121432] p-4 flex items-start gap-3.5 shadow-xs">
            <div className="w-11 h-11 rounded-full bg-violet-100 dark:bg-[#232559] border border-violet-200 dark:border-[#363a7d] flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5 text-violet-600 dark:text-[#b1a1ff]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Lembre-se:
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300/85 leading-relaxed">
                É normal sentir-se assim. Pequenos passos já fazem diferença.
                Você está fazendo o seu melhor, e isso importa.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sugestões rápidas expansíveis via botão + */}
      {showQuickPills && (
        <div className="shrink-0 flex flex-wrap gap-2 pb-2.5 pt-1">
          {QUICK_CHAT_PILLS.map((pill) => (
            <button
              key={pill}
              onClick={() => {
                setShowQuickPills(false);
                onSendMessage(pill);
              }}
              disabled={isLoading || riskLevel === 3}
              className="px-3.5 py-1.5 rounded-full bg-white dark:bg-[#171a42] border border-slate-200 dark:border-[#2f336d] text-xs font-medium text-slate-700 dark:text-violet-100 hover:border-violet-400 transition-colors cursor-pointer disabled:opacity-50"
            >
              {pill}
            </button>
          ))}
        </div>
      )}

      {/* Barra de Entrada */}
      <div className="shrink-0 pt-2 pb-1 flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => setShowQuickPills((prev) => !prev)}
          disabled={isLoading || riskLevel === 3}
          aria-label="Sugestões de conversa"
          title="Sugestões rápidas"
          className="w-11 h-11 rounded-full bg-white dark:bg-[#191b44] border border-slate-200 dark:border-[#2d3169] hover:border-violet-400 flex items-center justify-center text-slate-700 dark:text-white shrink-0 transition-colors cursor-pointer disabled:opacity-50"
        >
          <Plus
            className={`w-5 h-5 transition-transform ${
              showQuickPills ? "rotate-45" : ""
            }`}
          />
        </button>

        <div className="relative flex-1 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            disabled={isLoading || riskLevel === 3}
            placeholder={
              riskLevel === 3
                ? "Conversa pausada por segurança"
                : "Escreva sua mensagem..."
            }
            className="w-full pl-4 pr-14 py-3 rounded-full border border-slate-200 dark:border-[#2d3169] bg-white dark:bg-[#10122e] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-60"
          />

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading || riskLevel === 3}
            aria-label="Enviar mensagem"
            className="absolute right-1.5 w-9 h-9 rounded-full bg-gradient-to-r from-[#7658ff] to-[#4f36da] hover:brightness-110 text-white flex items-center justify-center shadow-md shadow-violet-600/25 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
