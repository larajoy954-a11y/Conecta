"use client";

import { useState } from "react";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ChevronRight,
  X,
  Mail,
  CheckCircle,
} from "lucide-react";

interface LoginModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onLoginSuccess: (user: { name: string; email: string }) => void;
  isStandalone?: boolean;
}

export default function LoginModal({
  isOpen = true,
  onClose,
  onLoginSuccess,
  isStandalone = false,
}: LoginModalProps) {
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [identifier, setIdentifier] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  if (!isOpen && !isStandalone) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userName = identifier.trim() || "Usuário";
    const userEmail = identifier.includes("@")
      ? identifier.trim()
      : `${userName.toLowerCase().replace(/\s+/g, "")}@email.com`;

    onLoginSuccess({
      name: userName,
      email: userEmail,
    });
    if (onClose) onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      name: name.trim() || "Novo Usuário",
      email: email.trim() || "usuario@email.com",
    });
    if (onClose) onClose();
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(
      "Instruções de recuperação foram enviadas para o seu e-mail."
    );
    setTimeout(() => {
      setNotification(null);
      setMode("login");
    }, 2500);
  };

  const handleSocialLogin = (provider: "Google" | "Apple") => {
    onLoginSuccess({
      name: `Usuário ${provider}`,
      email: `user.${provider.toLowerCase()}@exemplo.com`,
    });
    if (onClose) onClose();
  };

  const inputClass =
    "w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-[#0b0d24] border border-slate-200 dark:border-[#2a2e63] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all shadow-xs";

  const primaryButtonClass =
    "w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#7658ff] via-[#5e44ea] to-[#4b35d6] hover:brightness-110 text-white font-semibold text-sm sm:text-base shadow-lg shadow-violet-600/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer";

  const cardContent = (
    <div className="relative z-10 w-full max-w-[380px] sm:max-w-[410px] bg-white dark:bg-[#121432] border border-slate-200 dark:border-[#262958] rounded-[32px] p-6 sm:p-8 shadow-2xl transition-all">
      {!isStandalone && onClose && (
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {notification && (
        <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {mode === "login" && (
        <>
          <div className="text-center mb-6">
            <h2 className="text-[22px] sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Entrar na sua conta
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Acesse sua conta para continuar.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-violet-600 dark:text-[#9c87ff]">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                required
                placeholder="Nome de usuário ou e-mail"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-violet-600 dark:text-[#9c87ff]">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-violet-600 dark:text-[#9c87ff] hover:text-violet-800 dark:hover:text-violet-300 p-1 cursor-pointer"
                title={showPassword ? "Ocultar senha" : "Ver senha"}
              >
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 pb-1 px-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-md border-slate-300 dark:border-[#343878] text-violet-600 focus:ring-violet-500 accent-violet-600 cursor-pointer"
                />
                <span>Lembrar-me</span>
              </label>

              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="text-violet-600 dark:text-[#9c87ff] font-medium hover:underline cursor-pointer"
              >
                Esqueceu sua senha?
              </button>
            </div>

            <button type="submit" className={`${primaryButtonClass} mt-2`}>
              <span>Entrar</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          <div className="flex items-center my-4 text-xs text-slate-400">
            <div className="flex-1 h-px bg-slate-200 dark:bg-[#262958]" />
            <span className="px-3 text-slate-500 dark:text-slate-400 font-medium">
              ou
            </span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-[#262958]" />
          </div>

          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => handleSocialLogin("Google")}
              className="w-full py-2.5 px-4 rounded-full border border-slate-200 dark:border-[#2a2e63] bg-white dark:bg-[#171a42] hover:bg-slate-50 dark:hover:bg-[#1e2254] transition-all flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-xs cursor-pointer"
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continuar com Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin("Apple")}
              className="w-full py-2.5 px-4 rounded-full border border-slate-200 dark:border-[#2a2e63] bg-white dark:bg-[#171a42] hover:bg-slate-50 dark:hover:bg-[#1e2254] transition-all flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-xs cursor-pointer"
            >
              <svg
                className="w-4.5 h-4.5 fill-current text-slate-900 dark:text-white"
                viewBox="0 0 24 24"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.72-.93 2.74 1 .08 2.02-.49 2.64-1.24z" />
              </svg>
              <span>Continuar com Apple</span>
            </button>
          </div>

          <div className="text-center mt-5 text-xs text-slate-600 dark:text-slate-400">
            <p>Ainda não tem uma conta?</p>
            <button
              type="button"
              onClick={() => setMode("register")}
              className="mt-1 text-violet-600 dark:text-[#9c87ff] font-bold hover:underline inline-flex items-center gap-0.5 cursor-pointer"
            >
              <span>Criar conta</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-[#262958] text-center">
            <button
              type="button"
              onClick={() => {
                onLoginSuccess({
                  name: "Visitante",
                  email: "visitante@apoio.org",
                });
                if (onClose) onClose();
              }}
              className="text-[11px] text-slate-500 hover:text-violet-600 dark:text-slate-400 dark:hover:text-[#9c87ff] font-medium transition-colors cursor-pointer"
            >
              Continuar como visitante anônimo →
            </button>
          </div>
        </>
      )}

      {mode === "register" && (
        <div>
          <div className="text-center mb-6">
            <h2 className="text-[22px] sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Criar sua conta
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Junte-se ao Conecta gratuitamente.
            </p>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-violet-600 dark:text-[#9c87ff]">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                required
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-violet-600 dark:text-[#9c87ff]">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                required
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-violet-600 dark:text-[#9c87ff]">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Crie uma senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-violet-600 dark:text-[#9c87ff] p-1 cursor-pointer"
              >
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>

            <button type="submit" className={`${primaryButtonClass} mt-3`}>
              <span>Cadastrar</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          <div className="text-center mt-6 text-xs text-slate-600 dark:text-slate-400">
            <p>Já possui uma conta cadastrada?</p>
            <button
              type="button"
              onClick={() => setMode("login")}
              className="mt-1 text-violet-600 dark:text-[#9c87ff] font-bold hover:underline inline-flex items-center gap-0.5 cursor-pointer"
            >
              <span>Fazer login</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

      {mode === "forgot" && (
        <div>
          <div className="text-center mb-6">
            <h2 className="text-[22px] sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Recuperar Senha
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Informe o seu e-mail para enviarmos as instruções.
            </p>
          </div>

          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-violet-600 dark:text-[#9c87ff]">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                required
                placeholder="Seu e-mail cadastrado"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            <button type="submit" className={primaryButtonClass}>
              <span>Enviar Link de Recuperação</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          <div className="text-center mt-6 text-xs text-slate-600 dark:text-slate-400">
            <button
              type="button"
              onClick={() => setMode("login")}
              className="text-violet-600 dark:text-[#9c87ff] font-bold hover:underline inline-flex items-center gap-0.5 cursor-pointer"
            >
              <span>Voltar para o login</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (isStandalone) {
    return cardContent;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={onClose} />
      {cardContent}
    </div>
  );
}
