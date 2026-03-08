import React from 'react';
import StatCard from '@/components/StatCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { CheckCircle2, Calendar, Flame, PlusCircle } from 'lucide-react';

const SPPGBeranda: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-card rounded-lg shadow-card p-6 gradient-hero-soft">
        <h2 className="font-heading text-2xl font-bold">Selamat Datang, {user?.name} 👋</h2>
        <p className="text-muted-foreground mt-1">{user?.organization}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={CheckCircle2} label="Menu Hari Ini" value="Sudah Diinput" trend="✓" trendUp />
        <StatCard icon={Calendar} label="Total Menu Bulan Ini" value="22" />
        <StatCard icon={Flame} label="Rata-rata Kalori" value="718 kcal" trend="+3.2%" trendUp />
      </div>

      <div className="flex gap-3">
        <Link to="/sppg/input-menu"><Button className="rounded-lg"><PlusCircle className="h-4 w-4 mr-2" /> Input Menu Hari Ini</Button></Link>
        <Link to="/sppg/monitoring-sampah"><Button variant="outline" className="rounded-lg">Monitoring Sampah</Button></Link>
      </div>
    </div>
  );
};

export default SPPGBeranda;
