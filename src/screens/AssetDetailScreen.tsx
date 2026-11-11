import React, { useState } from 'react';
import {
  ChevronLeft,
  Share2,
  QrCode,
  Cpu,
  HardDrive,
  ShieldCheck,
  Calendar,
  Building,
  User,
  Phone,
  Mail,
  Wrench,
  UserCheck,
  Info,
  CheckCircle,
  ExternalLink,
  MapPin,
  Tag,
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { RepairModal, ReassignModal } from '../components/ActionModals';
import { Asset } from '../types';

interface AssetDetailScreenProps {
  asset: Asset;
  onBack: () => void;
  onUpdateAssetStatus?: (updated: Asset) => void;
}

export const AssetDetailScreen: React.FC<AssetDetailScreenProps> = ({
  asset,
  onBack,
  onUpdateAssetStatus,
}) => {
  const [currentAsset, setCurrentAsset] = useState<Asset>(asset);
  const [isRepairModalOpen, setIsRepairModalOpen] = useState(false);
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRepairConfirm = (issue: string, serviceCenter: string) => {
    const updated: Asset = {
      ...currentAsset,
      status: 'repair',
      statusText: "Ta'mirda",
    };
    setCurrentAsset(updated);
    if (onUpdateAssetStatus) onUpdateAssetStatus(updated);
    showToast(`Jihoz ${serviceCenter} ga ta'mir uchun yuborildi`);
  };

  const handleReassignConfirm = (personName: string, room: string, reason: string) => {
    const updated: Asset = {
      ...currentAsset,
      assignee: {
        ...currentAsset.assignee,
        name: personName,
        room: room,
      },
    };
    setCurrentAsset(updated);
    if (onUpdateAssetStatus) onUpdateAssetStatus(updated);
    showToast(`Jihoz yangi mas'ul ${personName} ga biriktirildi`);
  };

  // 2-column grid spec items
  const specItems = [
    {
      icon: <Cpu className="w-4 h-4 text-[#2563EB]" />,
      label: 'Protsessor',
      value: currentAsset.specs.processor || 'Apple M3 Max',
      sub: '16-core CPU, 40-core GPU',
    },
    {
      icon: <HardDrive className="w-4 h-4 text-emerald-600" />,
      label: 'Operativ xotira (RAM)',
      value: currentAsset.specs.ram || '36 GB',
      sub: 'Unified LPDDR5X',
    },
    {
      icon: <HardDrive className="w-4 h-4 text-purple-600" />,
      label: 'Doimiy xotira (SSD)',
      value: currentAsset.specs.storage || '1 TB',
      sub: 'Ultra-fast NVMe PCIe 4.0',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-amber-600" />,
      label: 'Kafolat muddati',
      value: currentAsset.specs.warranty || '2 yil',
      sub: 'Rasmiy servis kafolati',
    },
    {
      icon: <Calendar className="w-4 h-4 text-slate-600" />,
      label: 'Xarid sanasi',
      value: currentAsset.purchaseDate || '15 Yanvar, 2024',
      sub: `Narxi: ${currentAsset.price}`,
    },
    {
      icon: <Tag className="w-4 h-4 text-indigo-600" />,
      label: 'Seriya raqami',
      value: currentAsset.specs.serialNumber || 'C02G87Q0MD6R',
      sub: currentAsset.supplier,
    },
  ];

  return (
    <div className="flex-1 bg-[#F8FAFC] flex flex-col relative h-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-16 left-4 right-4 z-50 bg-[#0F172A] text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between animate-in slide-in-from-top-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <header className="px-5 pt-3 pb-3 bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between shrink-0">
        <button
          type="button"
          onClick={onBack}
          aria-label="Orqaga"
          className="w-10 h-10 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F172A] hover:bg-slate-50 active:scale-95 transition-all shadow-xs"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Jihoz Kartasi
          </p>
          <p className="text-sm font-extrabold text-[#0F172A] font-mono">
            {currentAsset.code}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            aria-label="QR pasport"
            className="w-10 h-10 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F172A] hover:bg-slate-50 active:scale-95 transition-all shadow-xs"
          >
            <QrCode className="w-4 h-4 text-[#2563EB]" />
          </button>
          <button
            type="button"
            onClick={() => showToast("Jihoz havolasi nusxalandi")}
            aria-label="Ulashish"
            className="w-10 h-10 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F172A] hover:bg-slate-50 active:scale-95 transition-all shadow-xs"
          >
            <Share2 className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </header>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto pb-32 no-scrollbar">
        {/* Tepada Jihoz Rasmi / Pasport Asosi */}
        <div className="px-5 pt-4">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs relative overflow-hidden group">
            <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
              <img
                src={currentAsset.image}
                alt={currentAsset.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-bold border border-white/20">
                  {currentAsset.category}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <StatusBadge status={currentAsset.status} label={currentAsset.statusText} />
              </div>
            </div>

            {/* Jihoz nomi, inventar raqami va status */}
            <div className="mt-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-xl font-black text-[#0F172A] tracking-tight">
                    {currentAsset.name}
                  </h1>
                  <p className="text-xs font-mono font-bold text-slate-400 mt-0.5">
                    Inventar kodi: {currentAsset.code}
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {currentAsset.model}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>{currentAsset.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2 ta Ustunli Grid Ro'yxat */}
        <div className="px-5 mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Texnik Xususiyatlari
            </h2>
            <span className="text-[11px] font-bold text-[#2563EB]">
              2 ustunli ro'yxat
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {specItems.map((spec, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-3.5 shadow-xs hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    {spec.icon}
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
                    {spec.label}
                  </p>
                </div>
                <p className="text-sm font-extrabold text-[#0F172A] tracking-tight truncate">
                  {spec.value}
                </p>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5 truncate">
                  {spec.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mas'ul Shaxs Bloki */}
        <div className="px-5 mt-5">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Mas'ul Shaxs Bloki
          </h2>

          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs">
            <div className="flex items-center gap-3.5">
              <img
                src={currentAsset.assignee.avatar}
                alt={currentAsset.assignee.name}
                className="w-13 h-13 rounded-2xl object-cover border-2 border-white shadow-md ring-1 ring-slate-200"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-[#0F172A] truncate">
                    {currentAsset.assignee.name}
                  </h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs text-slate-500 font-medium truncate">
                  {currentAsset.assignee.role}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Building className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span className="text-xs font-bold text-[#2563EB]">
                    {currentAsset.assignee.room}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    • {currentAsset.assignee.department}
                  </span>
                </div>
              </div>
            </div>

            {/* Aloqa tugmalari */}
            <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <a
                href={`tel:${currentAsset.assignee.phone}`}
                onClick={(e) => {
                  e.preventDefault();
                  showToast(`${currentAsset.assignee.phone} raqamiga ulanmoqda...`);
                }}
                className="py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 flex items-center justify-center gap-2 text-xs font-bold text-[#0F172A] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Qo'ng'iroq</span>
              </a>
              <a
                href={`mailto:${currentAsset.assignee.email}`}
                onClick={(e) => {
                  e.preventDefault();
                  showToast(`${currentAsset.assignee.email} ga xabar oynasi ochildi`);
                }}
                className="py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 flex items-center justify-center gap-2 text-xs font-bold text-[#0F172A] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Xabar yozish</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tizim qaydlari & Tarix */}
        <div className="px-5 mt-5">
          <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-3.5 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
              Jihoz korporativ axborot xavfsizligi standarti (ISO 27001) bo'yicha shifrlangan va IT inventar bazasiga kiritilgan. Har 6 oyda qayta auditdan o'tadi.
            </p>
          </div>
        </div>
      </div>

      {/* Ekranning eng pastida qotirilgan (sticky) ikkita tugma: "Ta'mirga jo'natish" (outline) va "Qayta biriktirish" (solid ko'k) */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] px-5 py-4 pb-6 shadow-xl flex items-center gap-3">
        {/* 1. Ta'mirga jo'natish (Outline) */}
        <button
          type="button"
          onClick={() => setIsRepairModalOpen(true)}
          className="flex-1 py-3.5 px-4 rounded-2xl border-2 border-slate-300 bg-white text-[#0F172A] hover:bg-slate-50 hover:border-slate-400 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xs"
        >
          <Wrench className="w-4 h-4 text-[#92400E]" />
          <span>Ta'mirga jo'natish</span>
        </button>

        {/* 2. Qayta biriktirish (Solid Ko'k) */}
        <button
          type="button"
          onClick={() => setIsReassignModalOpen(true)}
          className="flex-1 py-3.5 px-4 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-blue-500/30"
        >
          <UserCheck className="w-4 h-4 text-white" />
          <span>Qayta biriktirish</span>
        </button>
      </div>

      {/* Modals */}
      <RepairModal
        isOpen={isRepairModalOpen}
        onClose={() => setIsRepairModalOpen(false)}
        asset={currentAsset}
        onConfirm={handleRepairConfirm}
      />

      <ReassignModal
        isOpen={isReassignModalOpen}
        onClose={() => setIsReassignModalOpen(false)}
        asset={currentAsset}
        onConfirm={handleReassignConfirm}
      />

      {/* QR Code Passport Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full text-center border border-[#E2E8F0] shadow-2xl">
            <h3 className="text-base font-extrabold text-[#0F172A]">Raqamli QR Pasport</h3>
            <p className="text-xs text-slate-500 mt-0.5">{currentAsset.name}</p>

            <div className="w-48 h-48 mx-auto my-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center p-4">
              <QrCode className="w-36 h-36 text-[#0F172A]" />
            </div>

            <p className="font-mono text-xs font-bold text-[#2563EB]">{currentAsset.code}</p>
            <p className="text-[11px] text-slate-400 mt-1">Skaner orqali darhol kartani ochadi</p>

            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="mt-4 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
