export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 640 280"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full select-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#121436" />
          <stop offset="55%" stopColor="#1b1f54" />
          <stop offset="100%" stopColor="#26296b" />
        </linearGradient>
        <linearGradient id="windowGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#312e81" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="deskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10122e" />
          <stop offset="100%" stopColor="#232556" />
        </linearGradient>
        <radialGradient id="moonLight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b7aff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#8b7aff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="640" height="280" fill="url(#skyGrad)" />

      {/* Night Window on the right */}
      <g transform="translate(415, 16)">
        <rect
          x="0"
          y="0"
          width="196"
          height="154"
          rx="10"
          fill="#0c0e29"
          stroke="#2d3270"
          strokeWidth="4"
        />
        <rect x="6" y="6" width="184" height="142" rx="6" fill="url(#windowGlow)" />
        {/* Stars & Crescent Moon */}
        <circle cx="44" cy="34" r="1.6" fill="#c7d2fe" opacity="0.8" />
        <circle cx="88" cy="24" r="1.2" fill="#e0e7ff" opacity="0.6" />
        <circle cx="152" cy="40" r="1.8" fill="#c7d2fe" opacity="0.75" />
        <circle cx="132" cy="72" r="1.2" fill="#c7d2fe" opacity="0.55" />
        <circle cx="62" cy="78" r="1.4" fill="#a5b4fc" opacity="0.6" />
        <path
          d="M158 22a11 11 0 1 0 12 16 9 9 0 1 1-12-16Z"
          fill="#c4b5fd"
          opacity="0.85"
        />
        {/* Window panes */}
        <line x1="98" y1="4" x2="98" y2="150" stroke="#2d3270" strokeWidth="4" />
        <line x1="4" y1="84" x2="192" y2="84" stroke="#2d3270" strokeWidth="4" />
      </g>

      {/* Ambient moonlight wash */}
      <ellipse cx="470" cy="185" rx="180" ry="90" fill="url(#moonLight)" />

      {/* Desk surface */}
      <polygon points="0,210 640,175 640,280 0,280" fill="url(#deskGrad)" />
      <line x1="0" y1="210" x2="640" y2="175" stroke="#393e82" strokeWidth="2" opacity="0.7" />

      {/* Ceramic Mug */}
      <g transform="translate(432, 160)">
        <ellipse cx="22" cy="44" rx="22" ry="5" fill="#090a1f" opacity="0.55" />
        <path
          d="M4 10h34v27c0 6-7 10-17 10s-17-4-17-10V10Z"
          fill="#2d326e"
          stroke="#5c63b8"
          strokeWidth="1.5"
        />
        <ellipse cx="21" cy="10" rx="17" ry="4.5" fill="#1e2252" stroke="#6870cc" strokeWidth="1.2" />
        <path
          d="M38 16c6 0 9 3.5 9 8.5s-3 8.5-9 8.5"
          stroke="#5c63b8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Gentle steam */}
        <path
          d="M15 2c0-5 5-6 3-11M25 1c0-5 5-6 3-11"
          stroke="#a5b4fc"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.45"
        />
      </g>

      {/* Potted Plant on far right */}
      <g transform="translate(526, 98)">
        <ellipse cx="40" cy="110" rx="28" ry="6" fill="#090a1f" opacity="0.6" />
        {/* Leaves */}
        <path
          d="M38 72C26 52 12 42 8 24c16 4 28 18 33 44"
          fill="#373c85"
          stroke="#6b72d6"
          strokeWidth="1.4"
        />
        <path
          d="M40 72C36 46 38 24 44 6c8 18 10 42 2 66"
          fill="#474ea8"
          stroke="#7c83e8"
          strokeWidth="1.4"
        />
        <path
          d="M44 72C54 52 68 42 78 28c-4 18-16 32-30 44"
          fill="#373c85"
          stroke="#6b72d6"
          strokeWidth="1.4"
        />
        {/* Pot */}
        <path
          d="M18 70h44l-6 38c-1 3-6 5-16 5s-15-2-16-5L18 70Z"
          fill="#26295c"
          stroke="#5359a8"
          strokeWidth="1.5"
        />
        <ellipse cx="40" cy="70" rx="22" ry="4.5" fill="#1b1e47" stroke="#5c63b8" strokeWidth="1.3" />
      </g>

      {/* Open Notebook on the desk */}
      <g transform="translate(310, 196)">
        <ellipse cx="95" cy="48" rx="95" ry="12" fill="#07081a" opacity="0.65" />
        <polygon points="10,22 92,4 176,18 94,44" fill="#2a2f6b" stroke="#6269c7" strokeWidth="1.5" />
        <polygon points="22,21 90,7 162,19 94,40" fill="#cbd5ff" opacity="0.9" />
        <line x1="90" y1="7" x2="94" y2="40" stroke="#6366f1" strokeWidth="1.5" opacity="0.6" />
        {/* Notebook ruled lines */}
        <line x1="46" y1="20" x2="80" y2="14" stroke="#818cf8" strokeWidth="1.2" opacity="0.55" />
        <line x1="54" y1="25" x2="83" y2="20" stroke="#818cf8" strokeWidth="1.2" opacity="0.55" />
        <line x1="104" y1="15" x2="138" y2="21" stroke="#818cf8" strokeWidth="1.2" opacity="0.55" />
        <line x1="104" y1="21" x2="134" y2="26" stroke="#818cf8" strokeWidth="1.2" opacity="0.55" />
        {/* Pen */}
        <line
          x1="155"
          y1="38"
          x2="202"
          y2="24"
          stroke="#a5b4fc"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
