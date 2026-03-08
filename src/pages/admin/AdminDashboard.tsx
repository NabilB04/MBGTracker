import React from 'react';
import StatCard from '@/components/StatCard';
import { School, Users, FileText, AlertCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { laporanPerBulan, kualitasGiziPerMinggu, laporanList, sekolahList } from '@/data/mockData';

const statusData = [
  { name: 'Belum Ditangani', value: laporanList.filter(l => l.status === 'belum').length, color: 'hsl(0, 84%, 60%)' },
  { name: 'Dalam Proses', value: laporanList.filter(l => l.status === 'proses').length, color: 'hsl(34, 100%, 65%)' },
  { name: 'Sudah Ditangani', value: laporanList.filter(l => l.status === 'selesai').length, color: 'hsl(152, 46%, 30%)' },
];

const AdminDashboard: React.FC = () => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h2 className="font-heading text-2xl font-bold">Dashboard Utama</h2>
      <p className="text-muted-foreground text-sm">Ringkasan program MBG</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={School} label="Total Sekolah" value={sekolahList.length} trend="+2 bulan ini" trendUp />
      <StatCard icon={Users} label="Total Siswa Penerima" value="1.560" trend="+120" trendUp />
      <StatCard icon={FileText} label="Total Laporan Masuk" value={laporanList.length} />
      <StatCard icon={AlertCircle} label="Belum Ditangani" value={laporanList.filter(l => l.status === 'belum').length} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-card rounded-lg shadow-card p-5">
        <h3 className="font-heading font-semibold mb-4">Laporan per Bulan</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={laporanPerBulan}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="bulan" fontSize={12} /><YAxis fontSize={12} />
            <Tooltip />
            <Bar dataKey="jumlah" fill="hsl(4, 96%, 66%)" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-card rounded-lg shadow-card p-5">
        <h3 className="font-heading font-semibold mb-4">Kualitas Gizi Rata-rata</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={kualitasGiziPerMinggu}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="minggu" fontSize={12} /><YAxis fontSize={12} domain={[60, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="skor" stroke="hsl(152, 46%, 30%)" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-card rounded-lg shadow-card p-5">
        <h3 className="font-heading font-semibold mb-4">Status Laporan</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
              {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-card rounded-lg shadow-card p-5">
        <h3 className="font-heading font-semibold mb-4">Aktivitas Terbaru</h3>
        <div className="space-y-3">
          {[
            { text: 'Laporan baru dari Budi Santoso — SDN Ciputat 1', time: '5 menit lalu' },
            { text: 'Status laporan TK-20260307-002 diperbarui', time: '1 jam lalu' },
            { text: 'Menu hari ini berhasil diinput oleh SPPG Ciputat', time: '2 jam lalu' },
            { text: 'Data sampah SDN Cibubur 3 telah dilaporkan', time: '3 jam lalu' },
            { text: 'SPPG Menteng menambahkan menu baru', time: '5 jam lalu' },
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
              <div>
                <p className="text-foreground">{a.text}</p>
                <p className="text-xs text-muted-foreground">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
