import React from 'react';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import { monitoringKasusList } from '@/data/mockData';
import { AlertTriangle, Search, CheckCircle2, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const kasusPerBulan = [
  { bulan: 'Sep', kasus: 5 }, { bulan: 'Okt', kasus: 8 }, { bulan: 'Nov', kasus: 6 },
  { bulan: 'Des', kasus: 10 }, { bulan: 'Jan', kasus: 12 }, { bulan: 'Feb', kasus: 9 }, { bulan: 'Mar', kasus: 4 },
];

const MonitoringKasusPage: React.FC = () => {
  const aktif = monitoringKasusList.filter(k => k.status === 'aktif').length;
  const selesai = monitoringKasusList.filter(k => k.status === 'selesai').length;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-heading text-3xl font-bold mb-2">Monitoring Kasus</h1>
      <p className="text-muted-foreground mb-8">Pantau kasus terkait program MBG di seluruh Indonesia</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard icon={AlertTriangle} label="Total Kasus Bulan Ini" value={monitoringKasusList.length} />
        <StatCard icon={Clock} label="Kasus Aktif" value={aktif} />
        <StatCard icon={CheckCircle2} label="Sudah Diselesaikan" value={selesai} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Map placeholder */}
        <div className="lg:col-span-2 bg-card rounded-lg shadow-card p-5">
          <h3 className="font-heading font-semibold mb-4">Peta Sebaran Kasus</h3>
          <div className="bg-muted rounded-lg h-80 flex items-center justify-center relative overflow-hidden">
            <div className="text-center">
              <span className="text-6xl block mb-2">🗺️</span>
              <p className="text-sm text-muted-foreground">Peta Interaktif Indonesia</p>
            </div>
            {/* Dots overlay */}
            {monitoringKasusList.map((k, i) => (
              <div
                key={k.id}
                className={`absolute w-3 h-3 rounded-full animate-pulse ${
                  k.status === 'aktif' ? 'bg-destructive' : k.status === 'investigasi' ? 'bg-warning' : 'bg-accent'
                }`}
                style={{ top: `${30 + i * 10}%`, left: `${20 + i * 12}%` }}
                title={k.lokasi}
              />
            ))}
          </div>
          <div className="flex gap-4 mt-3 text-xs">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-destructive" /> Aktif</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-warning" /> Investigasi</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-accent" /> Selesai</span>
          </div>
        </div>

        {/* Side panel */}
        <div className="bg-card rounded-lg shadow-card p-5">
          <h3 className="font-heading font-semibold mb-4">Kasus Terbaru</h3>
          <div className="space-y-3">
            {monitoringKasusList.map(k => (
              <div key={k.id} className="border-b pb-3 last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{k.lokasi}</span>
                  <StatusBadge status={k.status} />
                </div>
                <p className="text-xs text-muted-foreground">{k.jenisKasus} · {k.tanggal}</p>
                <p className="text-xs text-muted-foreground mt-1">{k.deskripsi}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-card p-5 max-w-2xl">
        <h3 className="font-heading font-semibold mb-4">Kasus per Bulan</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={kasusPerBulan}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="bulan" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Bar dataKey="kasus" fill="hsl(4, 96%, 66%)" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonitoringKasusPage;
