import React, { useState } from 'react';
import { X, Wrench, UserCheck, AlertTriangle, CheckCircle, Calendar, Building, Sparkles } from 'lucide-react';
import { Asset } from '../types';

interface RepairModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset;
  onConfirm: (issue: string, serviceCenter: string) => void;
}

export const RepairModal: React.FC<RepairModalProps> = ({
  isOpen,
  onClose,
  asset,
  onConfirm,
}) => {
  const [issue, setIssue] = useState('');
  const [serviceCenter, setServiceCenter] = useState('Apple Authorized Service (MacBro)');
  const [urgency, setUrgency] = useState<'normal' | 'high'>('normal');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onConfirm(issue || "Profilaktik texnik ko'rik", serviceCenter);
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl border border-[#E2E8F0] p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Drag handle for mobile feel */}
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">Ta'mirga jo'natish</h3>
              <p className="text-xs text-slate-500 font-medium">{asset.name} ({asset.code})</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-[#0F172A]">Ta'mirga yuborildi!</h4>
            <p className="text-xs text-slate-500 mt-1">Servis arizasi #REP-2024-884 raqami bilan qayd etildi.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Nosozlik tavsifi *
              </label>
              <textarea
                required
                rows={3}
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                placeholder="Masalan: Ekran matritsasida chiziq paydo bo'ldi, zaryad ushlamayapti..."
                className="w-full text-xs text-[#0F172A] bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Servis markazi
              </label>
              <select
                value={serviceCenter}
                onChange={(e) => setServiceCenter(e.target.value)}
                className="w-full text-xs text-[#0F172A] bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all font-medium"
              >
                <option value="Apple Authorized Service (MacBro)">Apple Authorized Service (MacBro)</option>
                <option value="ErgoFix IT & Hardware Service">ErgoFix IT & Hardware Service</option>
                <option value="Asaxiy Texnik Ko'rik Markazi">Asaxiy Texnik Ko'rik Markazi</option>
                <option value="Kompaniya Ichki IT Diagnostikasi">Kompaniya Ichki IT Diagnostikasi</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Muhimlik darajasi
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setUrgency('normal')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    urgency === 'normal'
                      ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  Oddiy (3-5 ish kuni)
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency('high')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    urgency === 'high'
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  Shoshilinch (24 soat)
                </button>
              </div>
            </div>

            <div className="pt-2 flex gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/30 active:scale-95 transition-all"
              >
                Ta'mirga topshirish
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

interface ReassignModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset;
  onConfirm: (personName: string, room: string, reason: string) => void;
}

export const ReassignModal: React.FC<ReassignModalProps> = ({
  isOpen,
  onClose,
  asset,
  onConfirm,
}) => {
  const [selectedPerson, setSelectedPerson] = useState('Malika Rustamova');
  const [room, setRoom] = useState('302-xona (Dizayn)');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const employees = [
    { name: 'Malika Rustamova', role: 'UI/UX Designer', room: '302-xona' },
    { name: 'Farrux Tojiyev', role: 'Network Admin', room: 'Server xonasi' },
    { name: 'Sherzod Aliyev', role: 'Product Manager', room: '201-xona' },
    { name: 'Jasur Beknazarov', role: 'Frontend Architect', room: '304-xona' },
    { name: 'IT Zaxira Ombori', role: 'Omborxona hisobi', room: '101-omborxona' },
  ];

  const handleSelect = (emp: typeof employees[0]) => {
    setSelectedPerson(emp.name);
    setRoom(`${emp.room} (${emp.role})`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onConfirm(selectedPerson, room, notes);
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl border border-[#E2E8F0] p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB]">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">Qayta biriktirish</h3>
              <p className="text-xs text-slate-500 font-medium">{asset.name} ({asset.code})</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-[#0F172A]">Muvaffaqiyatli biriktirildi!</h4>
            <p className="text-xs text-slate-500 mt-1">Yangi akt tuzildi va {selectedPerson} ga xabarnoma yuborildi.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Yangi mas'ul xodimni tanlang:
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {employees.map((emp) => (
                  <button
                    key={emp.name}
                    type="button"
                    onClick={() => handleSelect(emp)}
                    className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-all ${
                      selectedPerson === emp.name
                        ? 'border-[#2563EB] bg-blue-50/70'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-[#0F172A]">{emp.name}</p>
                      <p className="text-[11px] text-slate-500">{emp.role} • {emp.room}</p>
                    </div>
                    {selectedPerson === emp.name && (
                      <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Joylashuv / Xona
              </label>
              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full text-xs text-[#0F172A] bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Biriktirish sababi / Buyruq raqami
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Masalan: Yangi loyihaga o'tishi munosabati bilan"
                className="w-full text-xs text-[#0F172A] bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="pt-2 flex gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/30 active:scale-95 transition-all"
              >
                Biriktirishni tasdiqlash
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
