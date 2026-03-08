import React from 'react';
import StatCard from '@/components/StatCard';
import { dataSampahList, getSekolahName } from '@/data/mockData';
import { Trash2, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const today = '2026-03-08';
const todayTotal = dataSampahList.filter(d => d.tanggal === today).reduce((a, d) => a + d.organik + d.anorganik, 0);
const monthTotal = dataSampahList.reduce((a, d) => a + d.organik + d.anorganik, 0);

const weeklyTrend = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(2026, 2, 8 - (6 - i));
  const dateStr = date.toISOString().split('T')[0];
  const total = dataSampahList.filter(d => d.tanggal === dateStr).reduce((a, d) => a + d.organik + d.anorganik, 0);
  return { hari: `${date.getDate()}/${date.getMonth() + 1}`, total: parseFloat(total.toFixed(1)) };
});

const DataSampahPage: React.FC = () => (
  <div className="space-y-6 animate-fade-in">
    <h2 className="font-heading text-2xl font-bold">Data Sampah</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <StatCard icon={Trash2} label="Total Limbah Hari Ini" value={`${todayTotal.toFixed(1)} kg`} />
      <StatCard icon={TrendingDown} label="Total Limbah Bulan Ini" value={`${monthTotal.toFixed(1)} kg`} />
    </div>

    <div className="bg-card rounded-lg shadow-card p-5">
      <h3 className="font-heading font-semibold mb-4">Trend Limbah per Hari</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={weeklyTrend}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="hari" fontSize={12} /><YAxis fontSize={12} />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="hsl(4, 96%, 66%)" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>

    <div className="bg-card rounded-lg shadow-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="py-3 px-4 text-left font-medium">Sekolah</th>
            <th className="py-3 px-4 text-left font-medium">Tanggal</th>
            <th className="py-3 px-4 text-left font-medium">Organik (kg)</th>
            <th className="py-3 px-4 text-left font-medium">Anorganik (kg)</th>
            <th className="py-3 px-4 text-left font-medium">Pelapor</th>
          </tr>
        </thead>
        <tbody>
          {dataSampahList.slice(0, 15).map(d => (
            <tr key={d.id} className="border-b hover:bg-muted/30">
              <td className="py-3 px-4">{getSekolahName(d.sekolahId)}</td>
              <td className="py-3 px-4">{d.tanggal}</td>
              <td className="py-3 px-4">{d.organik}</td>
              <td className="py-3 px-4">{d.anorganik}</td>
              <td className="py-3 px-4">{d.pelapor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default DataSampahPage;
