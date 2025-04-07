import { ReactNode } from "react";

export function FancyToolTip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="relative group cursor-pointer">
      {children}
      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-300 text-black text-sm px-3 py-1 rounded z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg shadow-zinc-300-400/30">
        {label}
      </div>
    </div>
  );
}
