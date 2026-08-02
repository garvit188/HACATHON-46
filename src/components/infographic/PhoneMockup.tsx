import React from "react";

interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export function PhoneMockup({ children, className = "", label }: PhoneMockupProps) {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {label && (
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[#8C8172]">
          {label}
        </div>
      )}
      <div className="relative w-[220px] rounded-[32px] bg-[#1C1712] p-[8px] shadow-[0_20px_60px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.05)]">
        {/* Side buttons */}
        <div className="absolute -left-[2px] top-[70px] h-[24px] w-[2px] rounded-l bg-[#2A2118]" />
        <div className="absolute -left-[2px] top-[100px] h-[36px] w-[2px] rounded-l bg-[#2A2118]" />
        <div className="absolute -left-[2px] top-[142px] h-[36px] w-[2px] rounded-l bg-[#2A2118]" />
        <div className="absolute -right-[2px] top-[100px] h-[44px] w-[2px] rounded-r bg-[#2A2118]" />

        {/* Screen */}
        <div className="relative overflow-hidden rounded-[24px] bg-[#FAF6EE]">
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-[6px] z-10 h-[22px] w-[64px] -translate-x-1/2 rounded-full bg-black" />

          {/* Screen content */}
          <div className="h-[420px] overflow-hidden">{children}</div>

          {/* Home indicator */}
          <div className="absolute bottom-[4px] left-1/2 h-[3px] w-[80px] -translate-x-1/2 rounded-full bg-black/20" />
        </div>
      </div>
    </div>
  );
}
