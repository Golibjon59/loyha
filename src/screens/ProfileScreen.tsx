import React from 'react';
import {
  User,
  Shield,
  FileSpreadsheet,
  Download,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Database,
  Building,
  CheckCircle,
} from 'lucide-react';

interface ProfileScreenProps {
  onOpenCodeExport: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onOpenCodeExport }) => {
  return (
    <div className="flex-1 bg-[#F8FAFC] pb-28 pt-1 overflow-y-auto no-scrollbar">
      {/* Header */}
      <header className="px-5 pt-3 pb-2">
        <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
          Foydalanuvchi Profili
        </h1>
        <p className="text-xs text-slate-500 font-medium">Tizim administratori va IT hisobotlar</p>
      </header>

      {/* User Card */}
      <div className="px-5 mt-3">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
              alt="Sanobar Karimova"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md ring-1 ring-slate-200"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-extrabold text-[#0F172A] truncate">
                Sanobar Karimova
              </h3>
              <p className="text-xs text-slate-500 font-medium">Senior IT Asset Manager</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#2563EB] text-[10px] font-bold">
                  Bosh Administrator
                </span>
                <span className="text-[11px] text-slate-400">• Tashkent HQ</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-slate-50 rounded-xl">
              <p className="text-base font-extrabold text-[#0F172A]">1,428</p>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Nazoratda</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <p className="text-base font-extrabold text-emerald-600">98.4%</p>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Audit aniqligi</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <p className="text-base font-extrabold text-[#2563EB]">$1.4M</p>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Aktiv qiymati</p>
            </div>
          </div>
        </div>
      </div>

      {/* Code Export Banner */}
      <div className="px-5 mt-4">
        <button
          type="button"
          onClick={onOpenCodeExport}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-4 shadow-md text-left flex items-center justify-between hover:shadow-lg transition-all active:scale-[0.99] group"
        >
          <div>
            <span className="px-2 py-0.5 rounded-md bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
              Dasturchilar Uchun
            </span>
            <h4 className="text-sm font-extrabold mt-1">React Native (Expo) Kodini Ko'rish</h4>
            <p className="text-[11px] text-blue-100 mt-0.5">
              NativeWind Tailwind bilan tayyor App.tsx kodini nusxalash
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* System Actions */}
      <div className="px-5 mt-5">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
          Inventarizatsiya & Hisobotlar
        </h2>
        <div className="bg-white border border-[#E2E8F0] rounded-2xl divide-y divide-slate-100 overflow-hidden shadow-xs">
          <button
            type="button"
            onClick={() => alert("Barcha 1,428 ta jihoz Excel (XLSX) formatida yuklab olindi")}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F172A]">Excel Hisobotni Yuklash (.xlsx)</p>
                <p className="text-[11px] text-slate-400">Yillik korporativ inventar reyestri</p>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => alert("QR yorliqlar 300 DPI PDF varaq shaklida chop etishga tayyorlandi")}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F172A]">QR Yorliqlarni Chop Etish (PDF)</p>
                <p className="text-[11px] text-slate-400">Shtrix-kod stikerlari to'plami</p>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
