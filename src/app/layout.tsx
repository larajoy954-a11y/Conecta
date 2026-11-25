import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conecta - Pequenos passos, grandes conquistas",
  description:
    "Assistente virtual de acolhimento, prática de comunicação e apoio emocional com IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className="h-full dark antialiased"
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
