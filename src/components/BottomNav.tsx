import React from 'react';
import { Home, Layers, QrCode, Wrench, User } from 'lucide-react';
import { ScreenTab } from '../types';

interface BottomNavProps {
  currentTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
  onOpenScanner: () => void;
  repairCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  onOpenScanner,
  repairCount = 48,
}) => {
  return (
    <nav className="absolute bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] px-3 pt-2 pb-5 transition-all">
      <div className="flex items-center justify-around relative max-w-md mx-auto">
        {/* 1. Asosiy (Home) */}
        <button
          type="button"
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 active:scale-95 ${
            currentTab === 'home' ? 'text-[#2563EB]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Home className={`w-5 h-5 transition-transform duration-200 ${currentTab === 'home' ? 'scale-110' : ''}`} />
          <span className={`text-[11px] font-semibold mt-1 tracking-tight ${currentTab === 'home' ? 'text-[#2563EB] font-bold' : 'text-slate-400'}`}>
            Asosiy
          </span>
          {currentTab === 'home' && (
            <span className="w-1 h-1 rounded-full bg-[#2563EB] mt-0.5" />
          )}
        </button>

        {/* 2. Jihozlar (List) */}
        <button
          type="button"
          onClick={() => onTabChange('list')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 active:scale-95 ${
            currentTab === 'list' ? 'text-[#2563EB]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Layers className={`w-5 h-5 transition-transform duration-200 ${currentTab === 'list' ? 'scale-110' : ''}`} />
          <span className={`text-[11px] font-semibold mt-1 tracking-tight ${currentTab === 'list' ? 'text-[#2563EB] font-bold' : 'text-slate-400'}`}>
            Jihozlar
          </span>
          {currentTab === 'list' && (
            <span className="w-1 h-1 rounded-full bg-[#2563EB] mt-0.5" />
          )}
        </button>

        {/* 3. Markaziy Katta Ko'k QR Tugma */}
        <div className="relative -top-5 flex flex-col items-center">
          <button
            type="button"
            onClick={onOpenScanner}
            title="QR Skanerni ochish"
            aria-label="QR Skanerni ochish"
            className="w-14 h-14 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-lg shadow-blue-500/40 border-4 border-[#F8FAFC] active:scale-90 hover:bg-blue-700 hover:shadow-blue-600/50 transition-all duration-300 group"
          >
            <QrCode className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
            {/* Glow ring */}
            <span className="absolute -inset-1 rounded-full bg-blue-500/20 animate-ping pointer-events-none" />
          </button>
          <span className="text-[10px] font-bold text-[#0F172A] mt-0.5">
            QR Skan
          </span>
        </div>

        {/* 4. Ta'mir (Wrench) */}
        <button
          type="button"
          onClick={() => onTabChange('repair')}
          className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 active:scale-95 ${
            currentTab === 'repair' ? 'text-[#2563EB]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="relative">
            <Wrench className={`w-5 h-5 transition-transform duration-200 ${currentTab === 'repair' ? 'scale-110' : ''}`} />
            {repairCount > 0 && (
              <span className="absolute -top-1 -right-2 px-1.5 py-0.2 bg-amber-500 text-white text-[9px] font-black rounded-full border-2 border-white shadow-xs">
                {repairCount}
              </span>
            )}
          </div>
          <span className={`text-[11px] font-semibold mt-1 tracking-tight ${currentTab === 'repair' ? 'text-[#2563EB] font-bold' : 'text-slate-400'}`}>
            Ta'mir
          </span>
          {currentTab === 'repair' && (
            <span className="w-1 h-1 rounded-full bg-[#2563EB] mt-0.5" />
          )}
        </button>

        {/* 5. Profil (User) */}
        <button
          type="button"
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 active:scale-95 ${
            currentTab === 'profile' ? 'text-[#2563EB]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <User className={`w-5 h-5 transition-transform duration-200 ${currentTab === 'profile' ? 'scale-110' : ''}`} />
          <span className={`text-[11px] font-semibold mt-1 tracking-tight ${currentTab === 'profile' ? 'text-[#2563EB] font-bold' : 'text-slate-400'}`}>
            Profil
          </span>
          {currentTab === 'profile' && (
            <span className="w-1 h-1 rounded-full bg-[#2563EB] mt-0.5" />
          )}
        </button>
      </div>
    </nav>
  );
};
