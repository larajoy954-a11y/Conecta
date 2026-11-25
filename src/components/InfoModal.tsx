"use client";

import { Brain, X } from "lucide-react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoModal({ isOpen, onClose }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative z-10 bg-white dark:bg-[#121432] border border-slate-200 dark:border-[#2a2d61] rounded-3xl max-w-md w-full p-6 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Fechar informações"
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-violet-500/15 border border-violet-400/25 rounded-2xl">
            <Brain className="w-6 h-6 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">
              Sobre o Conecta
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              TCC — 13ª Turma de Inteligência Artificial
            </p>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
          <p>
            O <strong>Conecta</strong> é um protótipo de assistente conversacional
            inteligente projetado para oferecer escuta empática, exercícios de
            comunicação e suporte inicial utilizando técnicas de RAG
            (Retrieval-Augmented Generation).
          </p>
          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl">
            <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
              Aviso Ético e Legal:
            </p>
            <p className="text-amber-700 dark:text-amber-300/90">
              Esta aplicação não realiza diagnósticos e não substitui a consulta
              com psicólogos ou psiquiatras.
            </p>
          </div>
          <p>
            Em situações de emergência ou sofrimento agudo, entre em contato com
            os serviços públicos de saúde mental ou ligue gratuitamente para o{" "}
            <strong>CVV (188)</strong>.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gradient-to-r from-[#6f52ff] to-[#4e34d8] hover:brightness-110 text-white rounded-full text-xs font-semibold cursor-pointer transition-all shadow-md shadow-violet-600/25"
          >
            Compreendido
          </button>
        </div>
      </div>
    </div>
  );
}
