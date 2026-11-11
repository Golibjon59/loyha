import React, { useState, useEffect } from 'react';
import {
  Wifi,
  Battery,
  Smartphone,
  Maximize2,
  Minimize2,
  Code2,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  activeScreenTitle: string;
  onOpenCodeExport: () => void;
  onResetToDashboard: () => void;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  activeScreenTitle,
  onOpenCodeExport,
  onResetToDashboard,
}) => {
  const [useDeviceFrame, setUseDeviceFrame] = useState(true);
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Application Bar for Web Sandbox */}
      <header className="bg-slate-950/90 border-b border-slate-800/80 px-4 py-2.5 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-blue-500/30">
            IT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-sm tracking-tight">InvenTrack Mobile</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/30">
                React Native & Tailwind
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Hozirgi ko'rinish: <span className="text-white font-semibold">{activeScreenTitle}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Reset button */}
          <button
            type="button"
            onClick={onResetToDashboard}
            title="Bosh sahifaga qaytish"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700/60 hidden sm:flex items-center gap-1.5 text-xs font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Qayta yuklash</span>
          </button>

          {/* Device Frame Toggle */}
          <button
            type="button"
            onClick={() => setUseDeviceFrame(!useDeviceFrame)}
            title={useDeviceFrame ? "To'liq ekran rejimi" : "Smartfon ramkasi rejimi"}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700 flex items-center gap-1.5 text-xs font-semibold"
          >
            {useDeviceFrame ? (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">To'liq ekran</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Smartfon ramkasi</span>
              </>
            )}
          </button>

          {/* React Native Code Export button */}
          <button
            type="button"
            onClick={onOpenCodeExport}
            className="px-3.5 py-1.5 rounded-xl bg-[#2563EB] hover:bg-blue-600 active:scale-95 text-white transition-all shadow-md shadow-blue-500/30 flex items-center gap-1.5 text-xs font-bold"
          >
            <Code2 className="w-4 h-4" />
            <span>React Native Kodini Olish</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-0 sm:p-6 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {useDeviceFrame ? (
          /* Phone Shell (iPhone 16 Pro styling) */
          <div className="w-full max-w-[400px] h-[850px] max-h-[92vh] bg-black rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-slate-800 relative flex flex-col transition-all">
            {/* Phone Outer details: Side buttons */}
            <div className="absolute -left-1.5 top-28 w-1 h-12 bg-slate-700 rounded-l-md" />
            <div className="absolute -left-1.5 top-44 w-1 h-12 bg-slate-700 rounded-l-md" />
            <div className="absolute -right-1.5 top-36 w-1 h-16 bg-slate-700 rounded-r-md" />

            {/* Phone Screen Display */}
            <div className="w-full h-full bg-[#F8FAFC] rounded-[40px] overflow-hidden flex flex-col relative border border-slate-200/40">
              {/* iOS Status Bar */}
              <div className="h-11 px-6 pt-2 flex items-center justify-between text-slate-800 shrink-0 z-40 bg-[#F8FAFC]/90 backdrop-blur-xs select-none">
                <span className="text-xs font-bold font-mono tracking-tight text-[#0F172A]">{currentTime}</span>

                {/* Dynamic Island pill */}
                <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2 gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500/70 animate-pulse" />
                </div>

                <div className="flex items-center gap-1.5 text-[#0F172A]">
                  <span className="text-[10px] font-bold">5G</span>
                  <Wifi className="w-3.5 h-3.5" />
                  <Battery className="w-4 h-4 fill-current" />
                </div>
              </div>

              {/* Mobile Screen Body */}
              <div className="flex-1 relative flex flex-col overflow-hidden bg-[#F8FAFC]">
                {children}
              </div>

              {/* iOS Home Indicator */}
              <div className="h-4 bg-white/90 backdrop-blur-md flex items-center justify-center shrink-0 z-40">
                <div className="w-32 h-1 bg-slate-400/80 rounded-full" />
              </div>
            </div>
          </div>
        ) : (
          /* Full Width Responsive View */
          <div className="w-full max-w-md h-[92vh] bg-[#F8FAFC] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative border border-slate-300">
            {/* Minimal Mobile Status Bar */}
            <div className="h-10 px-5 flex items-center justify-between text-slate-800 shrink-0 z-40 bg-white border-b border-slate-100 select-none">
              <span className="text-xs font-bold text-[#0F172A]">{currentTime}</span>
              <span className="text-xs font-bold text-[#2563EB]">InvenTrack Mobile</span>
              <div className="flex items-center gap-1 text-[#0F172A]">
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4 fill-current" />
              </div>
            </div>

            <div className="flex-1 relative flex flex-col overflow-hidden bg-[#F8FAFC]">
              {children}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
