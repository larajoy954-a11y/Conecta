import {
  DiaryEntry,
  FriendGroup,
  Message,
  MoodOption,
  PracticeItem,
} from "@/types/conecta";

export const INITIAL_CHAT_MESSAGES: Message[] = [
  {
    id: "init-1",
    text: "Olá! Estou aqui para te ouvir.\nPode me contar o que está sentindo ou o que gostaria de conversar hoje.",
    sender: "ai",
    timeLabel: "12:34",
  },
];

export const QUICK_CHAT_PILLS: string[] = [
  "Preciso desabafar...",
  "Me dê dicas de relaxamento.",
  "Como lidar com o estresse?",
];

export const PRACTICE_ITEMS: PracticeItem[] = [
  {
    id: "conversacao",
    title: "Conversação",
    description: "Exercícios para iniciar e manter uma conversa.",
    duration: "5 min",
    category: "Conversação",
    icon: "message",
    promptStarter: "Quero praticar como iniciar e manter uma conversa de forma leve.",
  },
  {
    id: "escuta-ativa",
    title: "Escuta ativa",
    description: "Aprenda a ouvir melhor e a se sentir mais seguro(a).",
    duration: "5 min",
    category: "Escuta",
    icon: "ear",
    promptStarter: "Gostaria de fazer um exercício rápido de escuta ativa.",
  },
  {
    id: "autoconfianca",
    title: "Autoconfiança",
    description: "Fortaleça sua autoestima e a forma como se vê.",
    duration: "7 min",
    category: "Autoconfiança",
    icon: "user",
    promptStarter: "Quero trabalhar minha autoconfiança e autoestima hoje.",
  },
  {
    id: "interacao-social",
    title: "Interação social",
    description: "Simulações de situações reais do dia a dia.",
    duration: "10 min",
    category: "Conversação",
    icon: "users",
    promptStarter: "Podemos simular uma interação social do dia a dia?",
  },
  {
    id: "desafios-diarios",
    title: "Desafios diários",
    description: "Pequenos desafios para você sair da zona de conforto.",
    duration: "5 min",
    category: "Autoconfiança",
    icon: "star",
    promptStarter: "Me dê um pequeno desafio diário para ganhar mais confiança.",
  },
];

export const DIARY_ENTRIES: DiaryEntry[] = [
  {
    id: "entry-1",
    dateLabel: "26 de abr. de 2025",
    tag: "Ansiedade",
    preview:
      "Hoje foi um dia difícil, mas consegui falar com alguém. Isso já é um avanço...",
    fullText:
      "Hoje foi um dia difícil, mas consegui falar com alguém sobre o que eu estava sentindo. Isso já é um avanço importante para mim e mostrou que não preciso carregar tudo sozinho(a).",
    period: "Hoje",
  },
  {
    id: "entry-2",
    dateLabel: "23 de abr. de 2025",
    tag: "Calma",
    preview:
      "Fiz uma pausa de cinco minutos para respirar antes da reunião e me senti bem melhor...",
    fullText:
      "Fiz uma pausa de cinco minutos para respirar antes da reunião e me senti bem melhor. Percebi que respeitar meu ritmo faz diferença no resto do dia.",
    period: "Esta semana",
  },
  {
    id: "entry-3",
    dateLabel: "14 de abr. de 2025",
    tag: "Autoconfiança",
    preview:
      "Consegui iniciar uma conversa no café sem ficar tão apreensivo(a) como antes...",
    fullText:
      "Consegui iniciar uma conversa no café sem ficar tão apreensivo(a) como antes. Pequenos passos realmente vão construindo mais segurança aos poucos.",
    period: "Este mês",
  },
];

export const MOOD_OPTIONS: MoodOption[] = [
  { id: "triste", label: "Triste" },
  { id: "cansado", label: "Cansado(a)" },
  { id: "neutro", label: "Neutro" },
  { id: "bem", label: "Bem" },
  { id: "muito_bem", label: "Muito bem" },
];

export const PROGRESS_METRICS = [
  {
    id: "days",
    label: "Dias de atividade",
    value: "12",
    subtext: "de 30 dias",
    icon: "calendar" as const,
  },
  {
    id: "chats",
    label: "Conversas realizadas",
    value: "8",
    subtext: "esta semana",
    icon: "messages" as const,
  },
  {
    id: "exercises",
    label: "Exercícios concluídos",
    value: "15",
    subtext: "no total",
    icon: "star" as const,
  },
  {
    id: "improvement",
    label: "Melhorou em",
    value: "+40%",
    subtext: "na confiança social",
    icon: "trend" as const,
  },
];

export const FRIEND_GROUPS: FriendGroup[] = [
  {
    id: "group-1",
    name: "Primeiros Passos",
    topic: "Comunicação leve",
    members: 24,
    description: "Espaço acolhedor para quem está praticando conversas no dia a dia sem pressão.",
  },
  {
    id: "group-2",
    name: "Respiração & Foco",
    topic: "Bem-estar",
    members: 38,
    description: "Troca de rotinas simples para lidar com momentos de ansiedade e sobrecarga.",
  },
  {
    id: "group-3",
    name: "Clube do Diário",
    topic: "Reflexão diária",
    members: 19,
    description: "Pessoas compartilhando pequenas vitórias e aprendizados da semana.",
  },
];
