import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conecta - Assistente de Apoio Emocional",
  description: "Assistente virtual de acolhimento e suporte emocional com IA",
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
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
