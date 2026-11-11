import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Code2, Download, Smartphone } from 'lucide-react';
import { REACT_NATIVE_APP_CODE } from '../data/reactNativeCode';

interface ReactNativeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReactNativeExportModal: React.FC<ReactNativeExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(REACT_NATIVE_APP_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([REACT_NATIVE_APP_CODE], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'InvenTrack_App.tsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-[#0F172A] border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">React Native (Expo) & NativeWind Kodi</h3>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-[10px] font-bold">
                  Barcha 4 ta ekran tayyor
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Dashboard • QR Skaner • Jihoz Kartasi • Fixed Bottom Navigation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              title="Yuklab olish (App.tsx)"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Yuklab olish</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-500/30'
                  : 'bg-[#2563EB] hover:bg-blue-600 text-white shadow-blue-500/30 active:scale-95'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Nusxalandi! ✓' : "Kodni nusxalash"}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Setup CLI hint */}
        <div className="px-6 py-2.5 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-300 font-mono">
          <div className="flex items-center gap-2 truncate">
            <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-400">Kerakli paketlar:</span>
            <span className="text-emerald-400 font-semibold select-all">
              npx expo install lucide-react-native nativewind react-native-safe-area-context
            </span>
          </div>
          <span className="text-[11px] text-slate-500 shrink-0 ml-4 hidden sm:inline">
            Tailwind CSS (NativeWind) v4/v2 moslashuvchan
          </span>
        </div>

        {/* Code Content */}
        <div className="flex-1 p-6 overflow-y-auto font-mono text-xs text-slate-200 bg-[#070D18] leading-relaxed selection:bg-blue-600 selection:text-white">
          <pre className="whitespace-pre-wrap">{REACT_NATIVE_APP_CODE}</pre>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-[#2563EB]" />
            React Native Expo loyihangizdagi <code>App.js</code> yoki <code>App.tsx</code> fayliga to'g'ridan-to'g'ri joylashtirishingiz mumkin.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
