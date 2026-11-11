import React from 'react';
import { AssetStatus } from '../types';

interface StatusBadgeProps {
  status: AssetStatus | string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, size = 'sm' }) => {
  let bgClass = 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]';
  let defaultLabel = 'Faol';
  let dotColor = 'bg-[#059669]';

  if (status === 'repair' || status === "Ta'mirda" || status === "repairing") {
    bgClass = 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]';
    defaultLabel = "Ta'mirda";
    dotColor = 'bg-[#D97706]';
  } else if (status === 'broken' || status === 'Nosoz' || status === 'damaged') {
    bgClass = 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]';
    defaultLabel = 'Nosoz';
    dotColor = 'bg-[#DC2626]';
  }

  const displayLabel = label || defaultLabel;

  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs font-semibold',
    md: 'px-3 py-1 text-xs font-bold',
    lg: 'px-3.5 py-1.5 text-sm font-bold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${bgClass} ${sizeClasses[size]} transition-all`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
      {displayLabel}
    </span>
  );
};
