import React from 'react';
import StatCard from '@/components/StatCard';
import { dataSampahList, getSekolahName } from '@/data/mockData';
import { Trash2, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const schoolTotals = ['s1', 's4'].map(sId => {
  const data = dataSampahList.filter(d => d.sekolahId === sId);
  return {
    sekolah: getSekolahName(sId),
    organik: parseFloat(data.reduce((a, d) => a + d.organik, 0).toFixed(1)),
    anorganik: parseFloat(data.reduce((a, d) => a + d.anorganik, 0).toFixed(1)),
  };
});

const todayTotal = dataSampahList.filter(d => d.tanggal === '2026-03-08' && ['s1', 's4'].includes(d.sekolahId))
  .reduce((a, d) => a + d.organik + d.anorganik, 0);
const weekTotal = dataSampahList.filter(d => ['s1', 's4'].includes(d.sekolahId))
  .reduce((a, d) => a + d.organik + d.anorganik, 0);

const SPPGMonitoringSampah: React.FC = () => (
  <div className="space-y-6 animate-fade-in">
    <h2 className="font-heading text-2xl font-bold">Monitoring Sampah</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <StatCard icon={Trash2} label="Total Sisa Hari Ini" value={`${todayTotal.toFixed(1)} kg`} />
      <StatCard icon={TrendingDown} label="Total Sisa Minggu Ini" value={`${weekTotal.toFixed(1)} kg`} />
    </div>

    <div className="bg-card rounded-lg shadow-card p-5">
      <h3 className="font-heading font-semibold mb-4">Perbandingan Sisa per Sekolah</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={schoolTotals}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="sekolah" fontSize={11} /><YAxis fontSize={12} />
          <Tooltip /><Legend />
          <Bar dataKey="organik" fill="hsl(152, 46%, 30%)" radius={[4,4,0,0]} name="Organik" />
          <Bar dataKey="anorganik" fill="hsl(34, 100%, 65%)" radius={[4,4,0,0]} name="Anorganik" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="bg-card rounded-lg shadow-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="py-3 px-4 text-left font-medium">Tanggal</th>
            <th className="py-3 px-4 text-left font-medium">Sekolah</th>
            <th className="py-3 px-4 text-left font-medium">Organik (kg)</th>
            <th className="py-3 px-4 text-left font-medium">Anorganik (kg)</th>
          </tr>
        </thead>
        <tbody>
          {dataSampahList.filter(d => ['s1', 's4'].includes(d.sekolahId)).slice(0, 14).map(d => (
            <tr key={d.id} className="border-b hover:bg-muted/30">
              <td className="py-3 px-4">{d.tanggal}</td>
              <td className="py-3 px-4">{getSekolahName(d.sekolahId)}</td>
              <td className="py-3 px-4">{d.organik}</td>
              <td className="py-3 px-4">{d.anorganik}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default SPPGMonitoringSampah;
