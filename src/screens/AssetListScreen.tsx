import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, ArrowUpDown, ChevronRight, Laptop, Monitor, Armchair, Wifi } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { Asset } from '../types';

interface AssetListScreenProps {
  assets: Asset[];
  onSelectAsset: (assetId: string) => void;
}

export const AssetListScreen: React.FC<AssetListScreenProps> = ({
  assets,
  onSelectAsset,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeStatus, setActiveStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  const categories = [
    { id: 'all', label: 'Barchasi', count: assets.length },
    { id: 'Laptops', label: 'Noutbuklar', count: 540 },
    { id: 'Monitors', label: 'Monitorlar', count: 320 },
    { id: 'Furniture', label: 'Mebel', count: 410 },
    { id: 'Network', label: 'Tarmoq', count: 158 },
  ];

  const filtered = assets.filter((asset) => {
    const matchesCat = activeCategory === 'all' || asset.category === activeCategory;
    const matchesStatus = activeStatus === 'all' || asset.status === activeStatus;
    const matchesSearch =
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.code.toLowerCase().includes(search.toLowerCase()) ||
      asset.assignee.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesStatus && matchesSearch;
  });

  return (
    <div className="flex-1 bg-[#F8FAFC] pb-28 pt-1 overflow-y-auto no-scrollbar">
      {/* Header */}
      <header className="px-5 pt-3 pb-2">
        <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
          Jihozlar Ro'yxati
        </h1>
        <p className="text-xs text-slate-500 font-medium">Barcha korporativ aktivlar katalogi</p>
      </header>

      {/* Search Input */}
      <div className="px-5 mt-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nomi, kodi yoki mas'ul shaxs..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium text-[#0F172A] bg-white border border-[#E2E8F0] rounded-2xl shadow-xs placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB]"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-5 mt-3 overflow-x-auto no-scrollbar flex items-center gap-2 pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-[#2563EB] text-white shadow-sm shadow-blue-500/20'
                : 'bg-white text-slate-600 border border-[#E2E8F0] hover:bg-slate-50'
            }`}
          >
            {cat.label} ({cat.count})
          </button>
        ))}
      </div>

      {/* Status Filter Chips */}
      <div className="px-5 mt-2.5 flex items-center gap-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Holat:</span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setActiveStatus('all')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
              activeStatus === 'all' ? 'bg-[#0F172A] text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Barchasi
          </button>
          <button
            type="button"
            onClick={() => setActiveStatus('active')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
              activeStatus === 'active' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Faol (1,190)
          </button>
          <button
            type="button"
            onClick={() => setActiveStatus('repair')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
              activeStatus === 'repair' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Ta'mir (48)
          </button>
        </div>
      </div>

      {/* Assets List */}
      <div className="px-5 mt-4 space-y-3">
        {filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectAsset(item.id)}
            className="w-full text-left bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs hover:border-slate-300 hover:shadow-md transition-all active:scale-[0.99] group flex items-center justify-between"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-13 h-13 rounded-xl object-cover border border-slate-100 shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    {item.code}
                  </span>
                  <StatusBadge status={item.status} label={item.statusText} />
                </div>
                <h3 className="text-sm font-extrabold text-[#0F172A] truncate mt-0.5">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium truncate">
                  Mas'ul: {item.assignee.name} • {item.assignee.room}
                </p>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
          </button>
        ))}
      </div>
    </div>
  );
};
