import React, { useState } from 'react';
import {
  Bell,
  Search,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  ChevronRight,
  X,
  Filter,
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { Asset, ActivityItem } from '../types';

interface DashboardScreenProps {
  onSelectAsset: (assetId: string) => void;
  onNavigateToTab: (tab: 'list' | 'repair' | 'profile') => void;
  onOpenScanner: () => void;
  activities: ActivityItem[];
  allAssets: Asset[];
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onSelectAsset,
  onNavigateToTab,
  onOpenScanner,
  activities,
  allAssets,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  // Search filter
  const filteredAssets = searchQuery.trim()
    ? allAssets.filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.assignee.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="flex-1 bg-[#F8FAFC] pb-28 pt-1 overflow-y-auto no-scrollbar">
      {/* 1. Header: Foydalanuvchi ismi va Bildirishnoma */}
      <header className="px-5 pt-3 pb-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              InvenTrack Mobile
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight mt-0.5">
            Salom, Sanobar! 👋
          </h1>
          <p className="text-xs text-slate-500 font-medium">Bosh ofis • IT Asset Management</p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Bildirishnomalar"
            className="relative w-11 h-11 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F172A] shadow-xs hover:bg-slate-50 active:scale-95 transition-all"
          >
            <Bell className="w-5 h-5 text-[#0F172A]" />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white ring-1 ring-red-400/50" />
          </button>

          {/* Quick Notification Popover */}
          {showNotifications && (
            <div className="absolute right-0 top-13 z-50 w-72 bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xl animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <span className="text-xs font-bold text-[#0F172A]">Bildirishnomalar (3)</span>
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-2 text-xs">
                <div
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigateToTab('repair');
                  }}
                  className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 cursor-pointer hover:bg-amber-100/60 transition-colors"
                >
                  <p className="font-bold text-amber-900 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> 3 ta ta'mir kechikmoqda!
                  </p>
                  <p className="text-[11px] text-amber-700 mt-0.5">ErgoFix va AudioMaster servislaridan javob kutilmoqda.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                  <p className="font-bold text-[#0F172A]">MacBook Pro 16" tekshirildi</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">QR pasport ma'lumotlari yangilandi.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* 2. Qidiruv maydoni */}
      <div className="px-5 mt-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Jihoz nomi yoki inventar raqami (masalan: JIH-00124)..."
            className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm font-medium text-[#0F172A] bg-white border border-[#E2E8F0] rounded-2xl shadow-xs placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/10 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {searchQuery.trim().length > 0 && (
          <div className="mt-2 bg-white rounded-2xl border border-[#E2E8F0] p-2 shadow-lg max-h-60 overflow-y-auto">
            <p className="text-[11px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
              Qidiruv natijalari ({filteredAssets.length})
            </p>
            {filteredAssets.length === 0 ? (
              <p className="text-xs text-slate-500 p-3 text-center">Bunday jihoz topilmadi</p>
            ) : (
              filteredAssets.map((asset) => (
                <button
                  key={asset.id}
                  type="button"
                  onClick={() => {
                    onSelectAsset(asset.id);
                    setSearchQuery('');
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between transition-colors border-b border-slate-50 last:border-none"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={asset.image}
                      alt={asset.name}
                      className="w-9 h-9 rounded-lg object-cover border border-slate-100"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#0F172A]">{asset.name}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{asset.code} • {asset.assignee.name}</p>
                    </div>
                  </div>
                  <StatusBadge status={asset.status} label={asset.statusText} />
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* 3. 2 ta Yonma-Yon Karta: Jami jihozlar (1,428) va Faol (1,190) */}
      <div className="px-5 mt-4 grid grid-cols-2 gap-3">
        {/* Karta 1: Jami jihozlar */}
        <button
          type="button"
          onClick={() => onNavigateToTab('list')}
          className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs text-left hover:border-blue-300 hover:shadow-md transition-all duration-200 active:scale-[0.98] group relative overflow-hidden"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] mb-3 group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-slate-500">Jami jihozlar</p>
          <p className="text-2xl font-black text-[#0F172A] tracking-tight mt-0.5">1,428</p>
          <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14 yangi (oylik)</span>
          </div>
          {/* Subtle background accent */}
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-blue-500/5 rounded-full pointer-events-none" />
        </button>

        {/* Karta 2: Faol jihozlar */}
        <button
          type="button"
          onClick={() => onNavigateToTab('list')}
          className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs text-left hover:border-emerald-300 hover:shadow-md transition-all duration-200 active:scale-[0.98] group relative overflow-hidden"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#065F46] mb-3 group-hover:scale-105 transition-transform">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-xs font-semibold text-slate-500">Faol jihozlar</p>
          <p className="text-2xl font-black text-[#065F46] tracking-tight mt-0.5">1,190</p>
          <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>83.3% foydalanishda</span>
          </div>
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-emerald-500/5 rounded-full pointer-events-none" />
        </button>
      </div>

      {/* 4. 1 ta To'liq Enli Ogohlantiruvchi Karta: "Ta'mirda (48) - 3 ta kechikmoqda" */}
      <div className="px-5 mt-3.5">
        <button
          type="button"
          onClick={() => onNavigateToTab('repair')}
          className="w-full bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-4 shadow-xs text-left hover:shadow-md hover:border-amber-400 transition-all duration-200 active:scale-[0.99] relative overflow-hidden group"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-300 flex items-center justify-center text-[#92400E] shrink-0 group-hover:scale-105 transition-transform">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#92400E]">Ta'mirda (48)</h3>
                  <span className="px-2 py-0.5 rounded-md bg-red-100 border border-red-200 text-red-700 text-[10px] font-extrabold animate-pulse">
                    3 ta kechikmoqda
                  </span>
                </div>
                <p className="text-xs text-amber-800/80 font-medium mt-0.5">
                  ErgoFix va AudioMaster servis markazlarida
                </p>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-white/80 border border-amber-200 flex items-center justify-center text-[#92400E] shrink-0 group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Quick status bar */}
          <div className="mt-3 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs font-semibold">
            <span className="text-amber-900 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> O'rtacha ta'mir muddati: 4.2 kun
            </span>
            <span className="text-[#2563EB] font-bold flex items-center gap-0.5">
              Ko'rish <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </button>
      </div>

      {/* Quick QR Scan Action Banner */}
      <div className="px-5 mt-4">
        <div className="bg-gradient-to-r from-[#0F172A] to-slate-800 rounded-2xl p-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-200">Tezkor inventarizatsiya</p>
              <p className="text-sm font-bold text-white">QR kod orqali jihoz pasporti</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenScanner}
            className="px-3.5 py-2 rounded-xl bg-white text-[#0F172A] text-xs font-bold hover:bg-slate-100 active:scale-95 transition-all shadow-sm"
          >
            Skan qilish
          </button>
        </div>
      </div>

      {/* 5. "So'nggi harakatlar" Vertikal Ro'yxati */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-extrabold text-[#0F172A] tracking-tight">
              So'nggi harakatlar
            </h2>
            <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
          </div>
          <button
            type="button"
            onClick={() => onNavigateToTab('list')}
            className="text-xs font-bold text-[#2563EB] hover:underline"
          >
            Barchasini ko'rish
          </button>
        </div>

        <div className="space-y-3">
          {activities.map((act) => (
            <div
              key={act.id}
              onClick={() => onSelectAsset(act.assetId)}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs hover:border-slate-300 hover:shadow-md transition-all cursor-pointer active:scale-[0.99] group"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 font-mono tracking-wider">
                    {act.assetCode}
                  </span>
                  <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                    {act.assetName}
                  </h3>
                </div>
                <StatusBadge status={act.badgeType} />
              </div>

              <p className="text-xs text-slate-600 font-medium">{act.action}</p>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <img
                    src={act.userAvatar}
                    alt={act.user}
                    className="w-5 h-5 rounded-full object-cover border border-slate-200"
                  />
                  <span className="font-semibold text-slate-600">{act.user}</span>
                </div>
                <div className="flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{act.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
