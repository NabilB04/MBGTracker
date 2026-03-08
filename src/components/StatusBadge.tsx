import React from 'react';

type Status = 'belum' | 'proses' | 'selesai' | 'aktif' | 'investigasi';

const statusConfig: Record<Status, { label: string; className: string }> = {
  belum: { label: 'Belum Ditangani', className: 'bg-destructive/10 text-destructive' },
  proses: { label: 'Dalam Proses', className: 'bg-warning/10 text-warning-foreground' },
  selesai: { label: 'Sudah Ditangani', className: 'bg-accent/10 text-accent' },
  aktif: { label: 'Aktif', className: 'bg-destructive/10 text-destructive' },
  investigasi: { label: 'Investigasi', className: 'bg-warning/10 text-warning-foreground' },
};

const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const cfg = statusConfig[status] || statusConfig.belum;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${cfg.className}`}>
      {cfg.label}
    </span>
  );
};

export default StatusBadge;
