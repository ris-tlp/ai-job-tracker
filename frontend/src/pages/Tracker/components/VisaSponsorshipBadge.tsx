import React from 'react';

interface VisaSponsorshipBadgeProps {
  status: string;
}

const badgeClassMap: Record<string, string> = {
  available: 'bg-green-100 text-green-700',
  not_available: 'bg-red-100 text-red-700',
  unavailable: 'bg-gray-100 text-gray-700',
};

const labelMap: Record<string, string> = {
  available: 'Available',
  not_available: 'Not Available',
  unavailable: 'Unavailable',
};

export const VisaSponsorshipBadge: React.FC<VisaSponsorshipBadgeProps> = ({ status }) => {
  const badgeClass = badgeClassMap[status] || 'bg-gray-100 text-gray-700';
  const label = labelMap[status] || status;
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 font-semibold text-xs min-w-[90px] text-center ${badgeClass}`}
    >
      {label}
    </span>
  );
};
