import { Heart } from "lucide-react";

interface ConectaLogoProps {
  size?: "sm" | "md" | "lg";
}

export default function ConectaLogo({ size = "md" }: ConectaLogoProps) {
  const sizes = {
    sm: "w-9 h-9",
    md: "w-11 h-11",
    lg: "w-14 h-14",
  };

  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-7 h-7",
  };

  return (
    <div
      className={`${sizes[size]} rounded-full bg-gradient-to-br from-[#815eff] via-[#5c48f6] to-[#3f78ff] flex items-center justify-center shadow-lg shadow-violet-600/30 shrink-0`}
    >
      <Heart className={`${iconSizes[size]} text-white fill-white/90`} />
    </div>
  );
}
