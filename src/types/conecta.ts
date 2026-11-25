export type TabId = "inicio" | "praticar" | "diario" | "progresso" | "perfil";

export type ActiveView = TabId | "conversa" | "amigos";

export type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
  timeLabel: string;
};

export type UserProfile = {
  name: string;
  email: string;
};

export type PracticeCategory = "Todos" | "Conversação" | "Escuta" | "Autoconfiança";

export type PracticeItem = {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: Exclude<PracticeCategory, "Todos">;
  icon: "message" | "ear" | "user" | "users" | "star";
  promptStarter: string;
};

export type DiaryPeriod = "Todos" | "Hoje" | "Esta semana" | "Este mês";

export type DiaryEntry = {
  id: string;
  dateLabel: string;
  tag: string;
  preview: string;
  fullText: string;
  period: Exclude<DiaryPeriod, "Todos">;
};

export type MoodId = "triste" | "cansado" | "neutro" | "bem" | "muito_bem";

export type MoodOption = {
  id: MoodId;
  label: string;
};

export type FriendGroup = {
  id: string;
  name: string;
  topic: string;
  members: number;
  description: string;
};
