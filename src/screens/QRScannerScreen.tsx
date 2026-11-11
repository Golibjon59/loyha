import React, { useState, useEffect } from 'react';
import {
  X,
  Zap,
  ZapOff,
  Camera,
  RefreshCw,
  QrCode,
  ArrowRight,
  ShieldCheck,
  Building,
  UserCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { Asset } from '../types';

interface QRScannerScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onViewAssetDetail: (asset: Asset) => void;
  primaryAsset: Asset;
  sampleAssets: Asset[];
}

export const QRScannerScreen: React.FC<QRScannerScreenProps> = ({
  isOpen,
  onClose,
  onViewAssetDetail,
  primaryAsset,
  sampleAssets,
}) => {
  const [torchOn, setTorchOn] = useState(false);
  const [scannedAsset, setScannedAsset] = useState<Asset | null>(primaryAsset);
  const [showBottomSheet, setShowBottomSheet] = useState(true);
  const [isScanning, setIsScanning] = useState(true);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);

  // Auto-trigger scan preview initially or on switch
  const handleSimulateScan = (asset: Asset) => {
    setIsScanning(false);
    setScannedAsset(asset);
    setShowBottomSheet(true);
  };

  const handleRescan = () => {
    setShowBottomSheet(false);
    setIsScanning(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden animate-in fade-in duration-300">
      {/* Top Controls Overlay */}
      <div className="relative z-20 flex items-center justify-between px-6 pt-5 pb-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <button
          type="button"
          onClick={onClose}
          aria-label="Yopish"
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 active:scale-90 transition-all border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <p className="text-white text-sm font-extrabold tracking-wide">
            QR & Barcode Skaner
          </p>
          <p className="text-[11px] text-white/70 font-medium">InvenTrack AI Kamera</p>
        </div>

        <button
          type="button"
          onClick={() => setTorchOn(!torchOn)}
          aria-label="Chiroq"
          className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-all border ${
            torchOn
              ? 'bg-amber-400 text-slate-900 border-amber-300 shadow-md shadow-amber-400/50'
              : 'bg-white/20 border-white/20 hover:bg-white/30'
          }`}
        >
          {torchOn ? <Zap className="w-5 h-5 fill-current" /> : <ZapOff className="w-5 h-5" />}
        </button>
      </div>

      {/* Main ViewFinder Body */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6">
        {/* Flashlight simulated glow */}
        {torchOn && (
          <div className="absolute inset-0 bg-amber-100/10 pointer-events-none transition-opacity duration-300" />
        )}

        {/* Central Scan Frame */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl border-2 border-white/30 flex items-center justify-center overflow-hidden shadow-2xl backdrop-blur-[2px]">
          {/* Corner target borders */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#2563EB] rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#2563EB] rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#2563EB] rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#2563EB] rounded-br-2xl" />

          {/* Laser beam animation */}
          {isScanning && (
            <div className="absolute left-2 right-2 h-0.7 bg-gradient-to-r from-transparent via-[#2563EB] to-transparent shadow-[0_0_15px_#2563EB] animate-laser pointer-events-none" />
          )}

          {/* Center Target Icon / QR watermark */}
          <div className="text-white/20 flex flex-col items-center pointer-events-none">
            <QrCode className="w-24 h-24" />
          </div>

          {/* Target Hint Badge */}
          <div className="absolute bottom-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/20">
            <span className="text-[11px] font-semibold text-white/90">
              {isScanning ? "QR kodni ramkaga to'g'rilang" : 'Jihoz aniqlandi!'}
            </span>
          </div>
        </div>

        {/* Test Preset Chooser */}
        <div className="mt-6 z-20 flex flex-col items-center gap-2 max-w-sm w-full">
          <p className="text-[11px] font-bold text-white/60 uppercase tracking-wider">
            Skanerlashni sinab ko'rish:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {sampleAssets.slice(0, 3).map((asset, idx) => (
              <button
                key={asset.id}
                type="button"
                onClick={() => handleSimulateScan(asset)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
                  scannedAsset?.id === asset.id && showBottomSheet
                    ? 'bg-[#2563EB] text-white border-blue-400 shadow-md shadow-blue-500/40'
                    : 'bg-white/10 text-white/90 border-white/20 hover:bg-white/20'
                }`}
              >
                {asset.name}
              </button>
            ))}
          </div>

          {!showBottomSheet && (
            <button
              type="button"
              onClick={() => handleSimulateScan(primaryAsset)}
              className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-2 shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5" />
              MacBook Pro 16" (JIH-2024-00124) ni skan qilish
            </button>
          )}
        </div>
      </div>

      {/* 2. Pastdan Chiqib Turuvchi "Bottom Sheet" (Modal) */}
      {showBottomSheet && scannedAsset && (
        <div className="relative z-30 w-full max-w-md mx-auto bg-white rounded-t-3xl border-t border-[#E2E8F0] p-6 shadow-2xl animate-in slide-in-from-bottom-6 duration-300">
          {/* Sheet Handle */}
          <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />

          {/* Skaner qilingan jihoz pasporti */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={scannedAsset.image}
                alt={scannedAsset.name}
                className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-xs"
              />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Topilgan Jihoz Pasporti
                </span>
                <h3 className="text-lg font-black text-[#0F172A] leading-tight">
                  {scannedAsset.name}
                </h3>
                <p className="text-xs font-mono font-bold text-slate-500 mt-0.5">
                  Inventar: {scannedAsset.code}
                </p>
              </div>
            </div>

            <StatusBadge status={scannedAsset.status} label={scannedAsset.statusText} />
          </div>

          {/* Quick Specs summary */}
          <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-[10px] font-semibold text-slate-400">Mas'ul xodim</p>
              <p className="font-bold text-[#0F172A] truncate">{scannedAsset.assignee.name}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-400">Xona / Joylashuv</p>
              <p className="font-bold text-[#0F172A] truncate">{scannedAsset.assignee.room}</p>
            </div>
          </div>

          {/* Bottom Actions: To'liq Ko'rish (Ko'k tugma) va Qayta skan */}
          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={handleRescan}
              title="Qayta skan qilish"
              className="w-12 h-12 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 active:scale-95 transition-all shrink-0"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => {
                onViewAssetDetail(scannedAsset);
                onClose();
              }}
              className="flex-1 py-3.5 px-4 rounded-2xl bg-[#2563EB] hover:bg-blue-700 active:scale-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all"
            >
              <span>To'liq ko'rish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
