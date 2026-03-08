import React from 'react';
import StatCard from '@/components/StatCard';
import { Flame, Beef, Wheat, Droplets } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const weeklyMenu = [
  { minggu: 'W1', kalori: 680, protein: 28, karbo: 85, lemak: 22 },
  { minggu: 'W2', kalori: 720, protein: 32, karbo: 90, lemak: 20 },
  { minggu: 'W3', kalori: 695, protein: 30, karbo: 82, lemak: 24 },
  { minggu: 'W4', kalori: 740, protein: 35, karbo: 88, lemak: 21 },
  { minggu: 'W5', kalori: 710, protein: 31, karbo: 86, lemak: 23 },
  { minggu: 'W6', kalori: 760, protein: 36, karbo: 92, lemak: 19 },
];

const kasusPerBulan = [
  { bulan: 'Sep', kasus: 8 }, { bulan: 'Okt', kasus: 12 }, { bulan: 'Nov', kasus: 10 },
  { bulan: 'Des', kasus: 15 }, { bulan: 'Jan', kasus: 18 }, { bulan: 'Feb', kasus: 14 }, { bulan: 'Mar', kasus: 6 },
];

const radarData = [
  { subject: 'Kalori', A: 85 }, { subject: 'Protein', A: 78 }, { subject: 'Karbohidrat', A: 90 },
  { subject: 'Lemak', A: 72 }, { subject: 'Serat', A: 65 }, { subject: 'Vitamin', A: 80 },
];

const PublicDashboard: React.FC = () => (
  <div className="container mx-auto px-4 py-10">
    <h1 className="font-heading text-3xl font-bold mb-2">Dashboard Publik</h1>
    <p className="text-muted-foreground mb-8">Statistik program MBG secara real-time</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard icon={Flame} label="Rata-rata Kalori" value="718 kcal" trend="+3.2% dari minggu lalu" trendUp />
      <StatCard icon={Beef} label="Rata-rata Protein" value="32g" trend="+5.1%" trendUp />
      <StatCard icon={Wheat} label="Rata-rata Karbohidrat" value="87g" trend="-1.2%" trendUp={false} />
      <StatCard icon={Droplets} label="Rata-rata Lemak" value="22g" trend="+0.8%" trendUp />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-card rounded-lg shadow-card p-5">
        <h3 className="font-heading font-semibold mb-4">Distribusi Menu per Minggu</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyMenu}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="minggu" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend />
            <Bar dataKey="kalori" fill="hsl(4, 96%, 66%)" radius={[4,4,0,0]} name="Kalori" />
            <Bar dataKey="protein" fill="hsl(152, 46%, 30%)" radius={[4,4,0,0]} name="Protein" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card rounded-lg shadow-card p-5">
        <h3 className="font-heading font-semibold mb-4">Laporan Kasus per Bulan</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={kasusPerBulan}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="bulan" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Line type="monotone" dataKey="kasus" stroke="hsl(4, 96%, 66%)" strokeWidth={2} dot={{ r: 4 }} name="Kasus" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="bg-card rounded-lg shadow-card p-5 max-w-lg mx-auto">
      <h3 className="font-heading font-semibold mb-4 text-center">Kualitas Gizi Keseluruhan</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis dataKey="subject" fontSize={12} />
          <Radar name="Skor" dataKey="A" stroke="hsl(4, 96%, 66%)" fill="hsl(4, 96%, 66%)" fillOpacity={0.2} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default PublicDashboard;
