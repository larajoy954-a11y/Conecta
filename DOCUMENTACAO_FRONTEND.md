# Documentação Profunda do Front-end — Conecta

Este documento explica, **passo a passo e em profundidade**, como cada linguagem e tecnologia foi utilizada na construção do front-end do **Conecta** (*Pequenos passos, grandes conquistas* — TCC da 13ª Turma de IA), detalhando a sintaxe, o motivo de cada escolha técnica e como os efeitos visuais e interações funcionam por baixo dos panos.

---

## Sumário

1. [Arquitetura das Linguagens no Next.js](#1-arquitetura-das-linguagens-no-nextjs)
2. [HTML5 Semântico e JSX (`.tsx`) em Profundidade](#2-html5-semântico-e-jsx-tsx-em-profundidade)
3. [CSS3 Moderno e Tailwind CSS v4 em Profundidade](#3-css3-moderno-e-tailwind-css-v4-em-profundidade)
4. [TypeScript em Profundidade](#4-typescript-em-profundidade)
5. [JavaScript Moderno, React Hooks e Programação Assíncrona](#5-javascript-moderno-react-hooks-e-programação-assíncrona)
6. [SVG Vetorial (Gráficos em Código) em Profundidade](#6-svg-vetorial-gráficos-em-código-em-profundidade)
7. [Next.js 16 (App Router) e Segurança em Desenvolvimento](#7-nextjs-16-app-router-e-segurança-em-desenvolvimento)
8. [Guia Passo a Passo de Como Tudo Se Conecta](#8-guia-passo-a-passo-de-como-tudo-se-conecta)

---

## 1. Arquitetura das Linguagens no Next.js

No projeto **Conecta**, não escrevemos um arquivo `.html` isolado, um `.css` isolado e um `.js` solto manipulando o DOM com `document.getElementById`. Em vez disso, o **Next.js 16 (`App Router`)** une quatro linguagens de forma declarativa:

1. **HTML / JSX**: descreve a estrutura da interface dentro de funções TypeScript (`.tsx`).
2. **CSS3 + Tailwind CSS v4**: estiliza, cria gradientes, desfoques, animações e responsividade usando classes utilitárias e variáveis CSS em [src/app/globals.css](src/app/globals.css).
3. **TypeScript**: adiciona verificação estática de tipos antes do código rodar no navegador.
4. **JavaScript (React + Fetch API)**: controla estados, eventos do usuário, `localStorage`, rolagem de tela e chamadas assíncronas (`POST`) para a IA.
5. **SVG**: desenha a ilustração noturna do banner principal em [src/components/HeroIllustration.tsx](src/components/HeroIllustration.tsx) com código vetorial puro.

---

## 2. HTML5 Semântico e JSX (`.tsx`) em Profundidade

O **JSX** (JavaScript XML) permite escrever marcação parecida com HTML diretamente dentro do TypeScript. Durante a compilação, o Next.js transforma cada tag JSX em chamadas React que constroem e atualizam o DOM de forma eficiente.

### 2.1 Diferenças essenciais do JSX em relação ao HTML clássico
- `className` no lugar de `class` (porque `class` é palavra reservada do JavaScript).
- Eventos escritos em *camelCase* (`onClick`, `onChange`, `onSubmit`, `onKeyDown`) recebendo funções em vez de strings.
- Expressões JavaScript entre chaves `{...}` para interpolar textos, aplicar classes dinâmicas ou renderizar blocos condicionalmente.
- Atributos booleanos ou de acessibilidade em *camelCase* ou padrão ARIA (`suppressHydrationWarning`, `aria-label`, `aria-hidden`).

### 2.2 Semântica aplicada nas telas do Conecta
Em vez de usar apenas `<div>`, o projeto estrutura cada tela com tags HTML5 de significado claro:

- **`<html lang="pt-BR" suppressHydrationWarning>`** em [src/app/layout.tsx](src/app/layout.tsx):
  - `lang="pt-BR"` indica a leitores de tela e mecanismos de busca que todo o conteúdo está em português do Brasil.
  - `suppressHydrationWarning` evita avisos falsos de hidratação caso a classe `dark` no `<html>` seja alternada no cliente conforme o `localStorage`.
- **`<header>`**: usado no topo da tela de login, em `HomeScreen`, `PracticeScreen`, `DiaryScreen`, `ProgressScreen`, `ProfileScreen`, `FriendsScreen` e `ChatScreen`.
- **`<aside>` e `<nav aria-label="...">`** em [src/components/NavigationBar.tsx](src/components/NavigationBar.tsx):
  - `<aside>` identifica a barra lateral esquerda em telas desktop (`lg+`).
  - `<nav aria-label="Navegação principal">` e `<nav aria-label="Barra inferior">` identificam os menus de navegação para tecnologia assistiva.
- **`<main>` e `<section>`**: delimitam a área principal em [src/app/page.tsx](src/app/page.tsx) e cada bloco lógico (banner hero, grade de ações, métricas de progresso, card motivacional).
- **`<form>` e `type="button"` vs `type="submit"`** em [src/components/LoginModal.tsx](src/components/LoginModal.tsx) e [src/components/screens/ChatScreen.tsx](src/components/screens/ChatScreen.tsx):
  - Dentro de `<form onSubmit={handleLoginSubmit}>`, o botão **Entrar** tem `type="submit"` para responder tanto ao clique quanto à tecla `Enter`, respeitando os atributos `required` dos `<input>`.
  - Botões que não devem enviar o formulário — como **Ver senha**, **Esqueceu sua senha?**, **Continuar com Google**, **Continuar com Apple** e o botão **`+`** no chat — recebem explicitamente `type="button"`, evitando envios acidentais de formulário.

### 2.3 Renderização condicional e listas em JSX
- **Operador `&&` (curto-circuito)**: exibe um elemento apenas quando a condição é verdadeira.
  ```tsx
  {isLoading && (
    <div className="flex items-center gap-2.5 ...">Conecta está digitando...</div>
  )}
  ```
- **Operador ternário (`condição ? A : B`)**: escolhe entre dois estados visuais (por exemplo, alinhar mensagens do usuário à direita e da IA à esquerda em `ChatScreen.tsx`, ou mostrar `<Sun>` / `<Moon>` conforme o tema).
- **`.map()` com `key`**: transforma arrays de dados (`PRACTICE_ITEMS`, `DIARY_ENTRIES`, `PROGRESS_METRICS`, `messages`) em cards ou balões HTML. O atributo `key={item.id}` permite que o React identifique exatamente qual item mudou sem recriar os outros.

---

## 3. CSS3 Moderno e Tailwind CSS v4 em Profundidade

O visual do **Conecta** é construído em duas camadas: a configuração global em [src/app/globals.css](src/app/globals.css) e as classes utilitárias nos componentes.

### 3.1 Como o Tailwind CSS v4 foi configurado (`globals.css`)

1. **`@import "tailwindcss";`**: importa todo o motor do Tailwind v4 sem necessidade do arquivo antigo `tailwind.config.js`.
2. **`@custom-variant dark (&:where(.dark, .dark *));`**: redefine a variante `dark:` para depender da classe `.dark` no ancestral (`<html>`), permitindo que o usuário alterne entre Tema Escuro e Tema Claro manualmente pelo botão do aplicativo.
3. **`@theme`**: cria tokens customizados de cor do projeto:
   ```css
   @theme {
     --color-conecta-bg: #07081c;
     --color-conecta-surface: #121432;
     --color-conecta-surface-elevated: #181b42;
     --color-conecta-border: #262958;
     --color-conecta-violet: #6d4aff;
     --color-conecta-violet-deep: #4e34d8;
   }
   ```
4. **Variáveis CSS (`:root` e `.dark`) e transição global**:
   ```css
   :root {
     --background: #f4f5fb;
     --foreground: #14162e;
   }
   .dark {
     --background: #07081c;
     --foreground: #f4f5ff;
   }
   body {
     background: var(--background);
     color: var(--foreground);
     transition: background-color 0.25s ease, color 0.25s ease;
   }
   ```
   Quando a classe `.dark` é adicionada ou removida do `<html>`, o `body` anima suavemente a troca de cor de fundo e texto em `0.25s`.

### 3.2 Layout com Flexbox e CSS Grid

- **Shell de tela cheia sem scroll duplo (`page.tsx`)**:
  - O container raiz usa `flex flex-col lg:flex-row h-screen overflow-hidden`.
  - A área central usa `flex-1 min-h-0 flex flex-col overflow-hidden`, com o container interno `flex-1 min-h-0 overflow-y-auto`.
  - **Por que `min-h-0` é fundamental?** No Flexbox, itens flexíveis têm `min-height: auto` por padrão, o que impediria o container de encolher e empurraria a barra inferior para fora da tela. `min-h-0` força o scroll a acontecer *apenas dentro* da área de mensagens ou da área de conteúdo, mantendo a barra inferior e o campo de digitação sempre fixos e visíveis.
- **Grades responsivas (`CSS Grid`)**:
  - `grid-cols-5` na barra inferior mobile garante 5 colunas de largura idêntica.
  - `grid-cols-3 gap-2.5 sm:gap-4` em `HomeScreen.tsx` mantém *Conversar*, *Praticar* e *Amigos* lado a lado tanto no celular quanto no desktop, aumentando o espaçamento (`gap-4`) em telas `>= 640px`.
  - `grid-cols-2 gap-3` em `ProgressScreen.tsx` organiza os 4 cartões de métricas em 2×2.

### 3.3 Anatomia de Todos os Efeitos Visuais

1. **Gradientes Lineares e Brilho Violeta (Glow)**:
   - Classes: `bg-gradient-to-r from-[#7658ff] to-[#4f36da]` + `shadow-lg shadow-violet-600/30`.
   - Em vez de usar sombra preta padrão (que "suja" interfaces escuras), usa-se uma sombra da mesma família cromática (`shadow-violet-600/30`, violeta com 30% de opacidade), dando a sensação de que o botão emite luz própria.

2. **Sobreposição de Degradê para Legibilidade (`HomeScreen.tsx`)**:
   - No card hero, a ilustração fica em uma camada absoluta (`absolute inset-0`), e sobre ela vai um gradiente direcional:
     `bg-gradient-to-r from-[#090b22]/95 via-[#0e1030]/80 to-transparent`.
   - Isso cria 95% de opacidade escura atrás do título branco à esquerda (garantindo contraste alto) e vai ficando transparente até 0% à direita para revelar a janela noturna do SVG.

3. **Glassmorphism (Efeito de Vidro Fosco)**:
   - Classes: `bg-white/80 dark:bg-[#0a0b24]/95 backdrop-blur-md` nos cabeçalhos/navegação e `bg-black/65 backdrop-blur-xs` atrás dos modais.
   - `backdrop-blur-*` aplica o filtro CSS `backdrop-filter: blur(...)`, borrando o conteúdo que está por baixo da camada semitransparente.

4. **Microinterações de Estado (`hover`, `active`, `group`)**:
   - `hover:brightness-110`: aumenta o brilho do gradiente em 10% ao passar o mouse sem precisar reescrever as cores hexadecimais.
   - `active:scale-[0.98]`: reduz a escala para 98% durante o clique, simulando o afundamento físico de um botão.
   - `group` + `group-hover:scale-105 transition-transform`: ao passar o mouse em qualquer ponto do card em `HomeScreen.tsx`, apenas a caixinha do ícone interno cresce suavemente.
   - `rotate-45` no botão `+` do `ChatScreen.tsx`: quando `showQuickPills` vira `true`, o ícone `+` gira `45°` com `transition-transform`, transformando-se visualmente em um `×` para indicar fechamento.

5. **Animação Sequencial de Digitação (`ChatScreen.tsx`)**:
   - Três bolinhas usam `animate-bounce` (animação `@keyframes bounce` do Tailwind) combinada com valores arbitrários de atraso CSS:
     - Bola 1: sem atraso (`0s`)
     - Bola 2: `[animation-delay:0.15s]`
     - Bola 3: `[animation-delay:0.3s]`
   - Essa defasagem de `150ms` cria o movimento contínuo de onda.

6. **Balões de Chat Assimétricos (`ChatScreen.tsx`)**:
   - Todos os cantos têm `rounded-2xl` (`16px`), exceto o canto voltado para o autor:
     - Mensagem do usuário (direita): `rounded-br-sm` (canto inferior direito quase reto).
     - Mensagem da IA (esquerda): `rounded-bl-sm` (canto inferior esquerdo quase reto).
   - Essa assimetria visual cria a "cauda" moderna do balão sem precisar de pseudo-elementos `::before`/`::after`.

7. **Scrollbars Customizadas (`globals.css`)**:
   - Seletores `::-webkit-scrollbar`, `::-webkit-scrollbar-track` e `::-webkit-scrollbar-thumb` reduzem a barra para `6px`, removem o trilho cinza padrão e aplicam violeta translúcido (`rgba(109, 74, 255, 0.28)`).

---

## 4. TypeScript em Profundidade

O **TypeScript** (`tsconfig.json` com `"strict": true`) adiciona segurança estática sobre o JavaScript. Tudo é verificado em tempo de desenvolvimento sem gerar custo de execução no navegador.

### 4.1 Tipos Literais e Uniões (`Union Types`)
Em [src/types/conecta.ts](src/types/conecta.ts):
```ts
export type TabId = "inicio" | "praticar" | "diario" | "progresso" | "perfil";
export type ActiveView = TabId | "conversa" | "amigos";
export type MoodId = "triste" | "cansado" | "neutro" | "bem" | "muito_bem";
```
- Em vez de aceitar qualquer `string`, `ActiveView` só permite exatamente esses 7 valores.
- Em [src/app/page.tsx](src/app/page.tsx), `riskLevel` é tipado como `useState<1 | 2 | 3>(1)`, restringindo os níveis de risco ético exclusivamente a `1`, `2` ou `3`.

### 4.2 Utilitários de Tipo (`Exclude` e Indexação)
- `category: Exclude<PracticeCategory, "Todos">` em `PracticeItem`: reaproveita `PracticeCategory`, removendo `"Todos"` porque um exercício específico pertence a uma categoria real, enquanto `"Todos"` é apenas um filtro.
- `(typeof PROGRESS_METRICS)[number]["icon"]` em `ProgressScreen.tsx`: extrai automaticamente os valores literais `"calendar" | "messages" | "star" | "trend"` direto do array constante `PROGRESS_METRICS`, evitando duplicar tipos manualmente.

### 4.3 `switch` Exaustivo em Componentes de Ícone
Nos helpers `PracticeIcon`, `MetricIcon` e `MoodFaceIcon`, o TypeScript realiza *type narrowing*: ao tratar todos os casos possíveis do tipo literal no `switch`, ele garante que nenhum caso fique sem retorno válido de JSX.

### 4.4 Tipagem de Eventos e Parsing Seguro
- Formulários em `LoginModal.tsx` usam `(e: React.FormEvent)` para garantir acesso tipado a `e.preventDefault()`.
- Ao interpretar a resposta da API em `page.tsx`, `JSON.parse(rawText)` é convertido com segurança para `{ text?: string; message?: string; error?: string }`, permitindo acessar campos opcionais com encadeamento opcional (`parsed?.error || parsed?.message`).

---

## 5. JavaScript Moderno, React Hooks e Programação Assíncrona

### 5.1 `"use client"` e Estado Declarativo (`useState`)
No Next.js App Router, componentes são *Server Components* por padrão. Arquivos que usam interatividade no navegador (`useState`, `onClick`, `window`) declaram `"use client"` na primeira linha.

- **Atualização imutável de listas**: em vez de fazer `messages.push(...)` (que mutaria o array e não avisaria o React), o chat usa:
  ```ts
  setMessages((prev) => [...prev, userMessage]);
  ```
  O operador *spread* (`...prev`) cria um novo array preservando o histórico anterior e adicionando a nova mensagem ao final.
- **Toggle em arrays (`FriendsScreen.tsx`)**:
  ```ts
  setJoinedIds((prev) =>
    prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
  );
  ```

### 5.2 Referências Diretas e Puras (`useRef`)
`useRef` armazena um objeto `{ current: valor }` que **sobrevive entre renderizações** sem disparar novas renderizações quando alterado:
- `scrollRef` (`ChatScreen.tsx`): aponta para a `<div>` das mensagens para controlar `scrollTop`.
- `mainScrollRef` (`page.tsx`): aponta para o container principal para voltar ao topo ao trocar de aba.
- `nextIdRef` (`page.tsx`): gera IDs sequenciais (`msg-2`, `msg-3`...) dentro dos handlers sem chamar `Date.now()` durante o fluxo de renderização, respeitando as regras de pureza do React 19 (`react-hooks/purity`).

### 5.3 Sincronização com o Mundo Externo (`useEffect` e `useSyncExternalStore`)

1. **`useSyncExternalStore` para o Tema (`page.tsx`)**:
   - Em React 19, chamar `setState` sincronamente dentro de `useEffect` para ler `localStorage` gera erro na regra `react-hooks/set-state-in-effect` porque provoca renderização em cascata.
   - A solução moderna adotada usa `useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot)`:
     - No servidor (SSR), `getServerThemeSnapshot` retorna `"dark"`.
     - No cliente, `getThemeSnapshot` lê `window.localStorage.getItem("conecta_theme")` dentro de `try/catch`, retornando `memoryTheme` caso `localStorage` esteja bloqueado em webview/iframe.
     - `subscribeToTheme` escuta eventos `"storage"` (outras abas) e `"conecta-theme-change"` (evento customizado disparado por `toggleTheme`).

2. **`useEffect` para Efeitos Colaterais no DOM**:
   - **Sincronizar tema no `<html>`**: `document.documentElement.classList.toggle("dark", theme === "dark")` roda sempre que `theme` muda.
   - **Reset de rolagem por aba**: `mainScrollRef.current.scrollTop = 0` roda sempre que `activeView` muda, evitando que uma nova tela abra já rolada para baixo.
   - **Auto-scroll no chat**: ajusta `scrollRef.current.scrollTop = scrollRef.current.scrollHeight` sempre que `messages` ou `isLoading` mudam.

### 5.4 JavaScript Assíncrono (`async/await` + `fetch`) e Triagem Ética

O envio de mensagens em `handleSendMessage` (`src/app/page.tsx`) combina lógica síncrona de segurança com requisição HTTP assíncrona:

1. **Triagem síncrona imediata (`evaluateRisk`)**:
   - Converte o texto para minúsculas (`text.toLowerCase()`) e usa `.some((kw) => lower.includes(kw))` contra listas de palavras-chave críticas e de alerta.
   - Se `detectedRisk === 3`, exibe imediatamente a mensagem de acolhimento com o número do **CVV (188)**, suspende novas entradas (`riskLevel === 3`) e retorna antes de chamar a API externa.
2. **Requisição HTTP com `fetch` e `async/await` (`fetchAIResponse`)**:
   - Faz `await fetch("https://psicologia-rag.onrender.com/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: userText }) })`.
   - Lê o corpo com `await response.text()` e tenta converter com `JSON.parse(rawText)` dentro de `try/catch` (suportando tanto JSON quanto texto puro).
   - Se `!response.ok` (ex.: erro `500`), **não lança `throw new Error` nem chama `console.error`**, evitando que o Next.js Dev Overlay bloqueie a tela — em vez disso, retorna o motivo formatado diretamente como mensagem da IA no chat.

---

## 6. SVG Vetorial (Gráficos em Código) em Profundidade

O arquivo [src/components/HeroIllustration.tsx](src/components/HeroIllustration.tsx) demonstra como usar **SVG (Scalable Vector Graphics)** dentro de React:

- **`viewBox="0 0 640 280"`**: define uma tela virtual de `640×280` unidades vetoriais independentes de pixels (não pixeliza em telas Retina/4K).
- **`preserveAspectRatio="xMaxYMid slice"`**:
  - `slice` faz o SVG preencher todo o retângulo do banner sem deixar faixas vazias nas laterais (equivalente ao `object-fit: cover` de imagens).
  - `xMaxYMid` ancora o recorte pela borda direita (`xMax`), garantindo que a janela noturna, a caneca e a planta nunca sejam cortadas no canto direito.
- **Primitivas geométricas usadas**:
  - `<rect>` e `<line>`: moldura e divisórias da janela.
  - `<polygon points="0,210 640,175 640,280 0,280">`: tampo da escrivaninha em perspectiva diagonal.
  - `<path d="...">`: curvas de Bézier cúbicas (`C`/`c`) para desenhar folhas orgânicas da planta e arcos (`a`) para a lua crescente.
  - `<g transform="translate(x, y)">`: agrupa cada objeto (janela, caneca, planta, caderno) em seu próprio sistema de coordenadas local, facilitando o posicionamento.

---

## 7. Next.js 16 (App Router) e Segurança em Desenvolvimento

- **Divisão Server vs Client**:
  - [src/app/layout.tsx](src/app/layout.tsx) permanece um **Server Component** (exporta `metadata` estático e entrega o HTML inicial rapidamente).
  - [src/app/page.tsx](src/app/page.tsx) e os componentes interativos rodam como **Client Components** (`"use client"`).
- **Configuração de Origens em [next.config.ts](next.config.ts)**:
  - O Next.js 16 bloqueia por padrão requisições *cross-origin* a recursos `/_next/*` durante o desenvolvimento.
  - A propriedade `allowedDevOrigins` (`["localhost", "127.0.0.1", "172.20.10.5", "*.devtunnels.ms", "*.app.github.dev"]`) garante que scripts de hidratação e HMR funcionem mesmo quando o projeto é aberto pelo IP de rede ou por encaminhamento de portas no VS Code.

---

## 8. Guia Passo a Passo de Como Tudo Se Conecta

1. O navegador requisita `/` → o servidor Next.js renderiza `RootLayout` (`layout.tsx`) com `globals.css` e `ConectaPage` (`page.tsx`).
2. `ConectaPage` inicializa `theme` via `useSyncExternalStore` (aplicando `.dark` no `<html>`) e `currentUser` como `null`, exibindo `LoginModal`.
3. Ao clicar em **Entrar**, **Continuar com Google** ou **Continuar como visitante anônimo →**, `onLoginSuccess` atualiza `currentUser` no estado React e troca a visualização para `HomeScreen` (*Início*) com a `NavigationBar` adaptada à largura da tela.
4. Ao navegar entre *Início*, *Praticar*, *Diário*, *Progresso*, *Perfil*, *Amigos* e *Conversa*, `activeView` troca o componente renderizado mantendo o estado do chat preservado na memória e resetando o scroll para o topo.
5. Na tela *Conversa*, cada mensagem enviada passa primeiro por `evaluateRisk` (segurança ética/CVV 188) e depois por `fetchAIResponse`, atualizando os balões e rolando suavemente até a resposta.

### Comandos de execução e validação
```bash
npm run dev          # Inicia o servidor de desenvolvimento (http://localhost:3000)
npm run lint         # Executa as regras do ESLint / React 19 / Next.js
npx tsc --noEmit     # Verifica toda a tipagem TypeScript sem gerar arquivos
```
