import React from 'react';
import { AlertTriangle, Clock, Wrench, CheckCircle2, ChevronRight, PhoneCall, ShieldAlert } from 'lucide-react';
import { overdueRepairs } from '../data/mockData';
import { Asset } from '../types';

interface RepairsScreenProps {
  onSelectAsset: (assetId: string) => void;
  allAssets: Asset[];
}

export const RepairsScreen: React.FC<RepairsScreenProps> = ({
  onSelectAsset,
  allAssets,
}) => {
  const repairAssets = allAssets.filter((a) => a.status === 'repair' || a.status === 'broken');

  return (
    <div className="flex-1 bg-[#F8FAFC] pb-28 pt-1 overflow-y-auto no-scrollbar">
      {/* Header */}
      <header className="px-5 pt-3 pb-2">
        <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
          Ta'mir & Servis
        </h1>
        <p className="text-xs text-slate-500 font-medium">Jami 48 ta jihoz ta'mir va diagnostika jarayonida</p>
      </header>

      {/* 3 ta Kechikayotgan Jihozlar Ogohlantiruvchi Bloki */}
      <div className="px-5 mt-3">
        <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-2xl p-4 shadow-xs">
          <div className="flex items-center gap-2.5 text-[#991B1B] mb-2">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <div>
              <h3 className="text-sm font-extrabold">3 ta jihoz muddati kechikmoqda!</h3>
              <p className="text-[11px] text-red-700/80 font-medium">Servis markazlari bilan zudlik bilan bog'laning</p>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            {overdueRepairs.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectAsset(item.assetId)}
                className="bg-white rounded-xl p-3 border border-red-200 shadow-xs cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                      {item.assetCode}
                    </span>
                    <h4 className="text-xs font-bold text-[#0F172A] mt-1">{item.assetName}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.issue}</p>
                  </div>
                  <span className="text-[10px] font-bold text-red-600 bg-red-100/70 px-2 py-1 rounded-lg shrink-0">
                    Kechikmoqda
                  </span>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-700">{item.serviceCenter}</span>
                  <span className="font-bold text-[#2563EB]">Kutilgan: {item.expectedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Barcha Ta'mirdagi Jihozlar */}
      <div className="px-5 mt-5">
        <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3">
          Jarayondagi Ta'mirlar
        </h2>

        <div className="space-y-3">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 font-mono">JIH-2023-00089</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
                Ehtiyot qism kutilmoqda
              </span>
            </div>
            <h3 className="text-sm font-bold text-[#0F172A]">Herman Miller Aeron Kursi</h3>
            <p className="text-xs text-slate-500 mt-0.5">Gaz-lift mexanizmi almashtirilishi kerak</p>

            {/* Stages indicator */}
            <div className="mt-3 grid grid-cols-4 gap-1.5 pt-2 border-t border-slate-100">
              <div className="text-center">
                <div className="h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[9px] font-bold text-emerald-700 mt-1 block">Qabul</span>
              </div>
              <div className="text-center">
                <div className="h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[9px] font-bold text-emerald-700 mt-1 block">Tashxis</span>
              </div>
              <div className="text-center">
                <div className="h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[9px] font-bold text-amber-700 mt-1 block">Qismlar</span>
              </div>
              <div className="text-center">
                <div className="h-1.5 rounded-full bg-slate-200" />
                <span className="text-[9px] font-medium text-slate-400 mt-1 block">Tayyor</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 font-mono">JIH-2023-00045</span>
              <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-bold">
                Nosoz / Hisobdan chiqarish
              </span>
            </div>
            <h3 className="text-sm font-bold text-[#0F172A]">ThinkPad X1 Carbon Gen 11</h3>
            <p className="text-xs text-slate-500 mt-0.5">Ekran matritsasi va anakarta shikastlangan</p>
          </div>
        </div>
      </div>
    </div>
  );
};
