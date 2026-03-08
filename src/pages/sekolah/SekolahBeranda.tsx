import React from 'react';
import StatCard from '@/components/StatCard';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed, FileText, Bell, PlusCircle } from 'lucide-react';

const SekolahBeranda: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-card rounded-lg shadow-card p-6 gradient-hero-soft">
        <h2 className="font-heading text-2xl font-bold">Selamat Datang, {user?.name} 👋</h2>
        <p className="text-muted-foreground mt-1">{user?.organization}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={UtensilsCrossed} label="Menu Hari Ini" value="Tersedia" trend="dari SPPG Ciputat" trendUp />
        <StatCard icon={FileText} label="Laporan Sampah Bulan Ini" value="7" />
        <StatCard icon={Bell} label="Notifikasi" value="2 baru" />
      </div>

      <div className="bg-card rounded-lg shadow-card p-5">
        <h3 className="font-heading font-semibold mb-3">Menu Terbaru</h3>
        <div className="flex flex-wrap gap-2">
          {['Nasi Putih', 'Ayam Goreng', 'Sayur Bayam', 'Buah Pisang', 'Susu UHT'].map(item => (
            <span key={item} className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">{item}</span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Link to="/sekolah/input-sampah"><Button className="rounded-lg"><PlusCircle className="h-4 w-4 mr-2" /> Input Sisa Makanan</Button></Link>
        <Link to="/sekolah/menu-hari-ini"><Button variant="outline" className="rounded-lg">Lihat Menu Hari Ini</Button></Link>
      </div>
    </div>
  );
};

export default SekolahBeranda;
