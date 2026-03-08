import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { School, Users, FileText, ArrowRight, Flame, Beef, Wheat, Droplets, ShieldCheck, BarChart3, Utensils, HeartPulse, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, ChevronRight } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';
import StatCard from '@/components/StatCard';


const CountUpNumber: React.FC<{ end: number; suffix?: string; decimals?: number }> = ({ end, suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const duration = 1800;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(decimals > 0 ? parseFloat(start.toFixed(decimals)) : Math.floor(start));
        }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, decimals]);

  return <div ref={ref} className="text-3xl md:text-4xl font-heading font-bold text-primary">{count.toLocaleString('id-ID')}{suffix}</div>;
};

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

const trendGizi = [
  { bulan: 'Sep', skor: 72 }, { bulan: 'Okt', skor: 75 }, { bulan: 'Nov', skor: 74 },
  { bulan: 'Des', skor: 78 }, { bulan: 'Jan', skor: 80 }, { bulan: 'Feb', skor: 83 }, { bulan: 'Mar', skor: 86 },
];

const LandingPage: React.FC = () => {
  const issues = [
    { emoji: '📰', title: 'Temuan Susu Kadaluarsa di SDN Menteng 2', desc: 'Petugas menemukan 50 kotak susu UHT yang melewati tanggal kedaluwarsa dalam gudang penyimpanan.', date: '7 Mar 2026', tag: 'Investigasi' },
    { emoji: '✅', title: 'Peningkatan Kualitas Menu di SPPG Ciputat', desc: 'SPPG Ciputat berhasil meningkatkan skor gizi rata-rata dari 72 menjadi 88 dalam 2 bulan terakhir.', date: '5 Mar 2026', tag: 'Positif' },
    { emoji: '♻️', title: 'Program Zero Waste di SDN Cibubur 3', desc: 'Inisiatif pengurangan sisa makanan berhasil mengurangi limbah organik hingga 40% dalam sebulan.', date: '3 Mar 2026', tag: 'Lingkungan' },
  ];

  const features = [
    { icon: BarChart3, title: 'Dashboard Real-time', desc: 'Pantau statistik gizi dan laporan secara langsung dengan data terupdate.' },
    { icon: ShieldCheck, title: 'Pelaporan Transparan', desc: 'Laporkan masalah makanan dengan mudah dan pantau status tindak lanjutnya.' },
    { icon: Utensils, title: 'Monitoring Menu', desc: 'Lihat menu harian setiap sekolah beserta informasi nutrisi lengkap.' },
    { icon: HeartPulse, title: 'AI Scanner Gizi', desc: 'Analisis kandungan gizi makanan dengan teknologi kecerdasan buatan.' },
  ];

  const partners = ['Kementerian Pendidikan', 'Kementerian Kesehatan', 'BPOM', 'Dinas Pendidikan DKI', 'WHO Indonesia'];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 gradient-hero opacity-[0.06]" />
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-warning/5 blur-3xl" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Platform Monitoring MBG Indonesia
            </div>
            <span className="text-6xl md:text-8xl block mb-6">🍱</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Pantau Gizi, Jaga Masa Depan{' '}
              <span className="text-primary relative">
                Anak Indonesia
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8C50 2 100 2 150 6C200 10 250 4 298 8" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Platform monitoring program Makan Bergizi Gratis secara transparan dan real-time untuk memastikan kualitas gizi terbaik bagi siswa Indonesia
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
              <Link to="/menu-sekolah">
                <Button size="lg" className="rounded-xl px-8 h-12 text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                  Lihat Menu Sekolah <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/laporan">
                <Button size="lg" variant="outline" className="rounded-xl px-8 h-12 text-base">
                  Laporkan Masalah
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 mt-10 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-accent" /> Terverifikasi</div>
              <div className="flex items-center gap-1.5"><BarChart3 className="h-4 w-4 text-accent" /> Real-time</div>
              <div className="flex items-center gap-1.5"><HeartPulse className="h-4 w-4 text-accent" /> AI-Powered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-20 bg-card relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-card" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Dampak Nyata Program MBG</h2>
            <p className="text-muted-foreground mt-2">Data terupdate secara real-time dari seluruh Indonesia</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: School, label: 'Sekolah Penerima', value: 12450 },
              { icon: Users, label: 'Siswa Penerima', value: 3200000, suffix: '+' },
              { icon: FileText, label: 'Total Laporan Warga', value: 8920 },
            ].map((stat, i) => (
              <div key={i} className="text-center p-8 rounded-2xl bg-background shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in group" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-7 w-7 text-primary" />
                </div>
                <CountUpNumber end={stat.value} suffix={stat.suffix} />
                <p className="text-sm text-muted-foreground mt-2 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Fitur Unggulan</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mt-2">Semua yang Anda Butuhkan</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Satu platform lengkap untuk monitoring, pelaporan, dan analisis program MBG</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300 group animate-fade-in border border-border/50" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <f.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Dashboard Publik</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mt-2">Statistik Program MBG</h2>
            <p className="text-muted-foreground mt-2">Data gizi dan monitoring secara real-time</p>
          </div>

          {/* Nutrition Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon={Flame} label="Rata-rata Kalori" value="718 kcal" trend="+3.2% dari minggu lalu" trendUp />
            <StatCard icon={Beef} label="Rata-rata Protein" value="32g" trend="+5.1%" trendUp />
            <StatCard icon={Wheat} label="Rata-rata Karbohidrat" value="87g" trend="-1.2%" trendUp={false} />
            <StatCard icon={Droplets} label="Rata-rata Lemak" value="22g" trend="+0.8%" trendUp />
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-card rounded-2xl shadow-card p-6 border border-border/50">
              <h3 className="font-heading font-semibold mb-1">Distribusi Menu per Minggu</h3>
              <p className="text-xs text-muted-foreground mb-4">Kalori dan protein dalam 6 minggu terakhir</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={weeklyMenu}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="minggu" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))' }} />
                  <Legend />
                  <Bar dataKey="kalori" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} name="Kalori" />
                  <Bar dataKey="protein" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} name="Protein" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card rounded-2xl shadow-card p-6 border border-border/50">
              <h3 className="font-heading font-semibold mb-1">Tren Skor Kualitas Gizi</h3>
              <p className="text-xs text-muted-foreground mb-4">Peningkatan kualitas gizi rata-rata nasional</p>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={trendGizi}>
                  <defs>
                    <linearGradient id="giziGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="bulan" fontSize={12} />
                  <YAxis fontSize={12} domain={[60, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))' }} />
                  <Area type="monotone" dataKey="skor" stroke="hsl(var(--accent))" fill="url(#giziGrad)" strokeWidth={2} name="Skor Gizi" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl shadow-card p-6 border border-border/50">
              <h3 className="font-heading font-semibold mb-1">Laporan Kasus per Bulan</h3>
              <p className="text-xs text-muted-foreground mb-4">Jumlah laporan masuk dari warga</p>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={kasusPerBulan}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="bulan" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))' }} />
                  <Line type="monotone" dataKey="kasus" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 5, fill: 'hsl(var(--primary))' }} name="Kasus" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card rounded-2xl shadow-card p-6 border border-border/50">
              <h3 className="font-heading font-semibold mb-1 text-center">Kualitas Gizi Keseluruhan</h3>
              <p className="text-xs text-muted-foreground mb-4 text-center">Skor pemenuhan standar nutrisi</p>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="subject" fontSize={11} />
                  <Radar name="Skor" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.15} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>


      {/* Issues / News — IMPROVED */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Edukasi Terkini</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mt-2">Highlight Isu Terkini</h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">Informasi terbaru seputar program Makan Bergizi Gratis di seluruh Indonesia</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

            <div className="group relative bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-border/50 flex flex-col animate-fade-in">
 
              <div className="relative h-44 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, hsl(var(--destructive)) 0%, transparent 60%)' }} />

                <svg width="120" height="100" viewBox="0 0 120 100" fill="none" className="drop-shadow-md">

                  <rect x="30" y="20" width="38" height="52" rx="4" fill="#f97316" opacity="0.9"/>
                  <rect x="34" y="24" width="30" height="20" rx="2" fill="white" opacity="0.8"/>
                  <text x="49" y="38" textAnchor="middle" fontSize="8" fill="#f97316" fontWeight="bold">UHT</text>
                  <rect x="34" y="48" width="30" height="3" rx="1" fill="white" opacity="0.5"/>
                  <rect x="34" y="54" width="20" height="3" rx="1" fill="white" opacity="0.5"/>
     
                  <circle cx="78" cy="28" r="14" fill="#ef4444" opacity="0.15"/>
                  <circle cx="78" cy="28" r="10" fill="none" stroke="#ef4444" strokeWidth="2"/>
                  <line x1="73" y1="23" x2="83" y2="33" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1="83" y1="23" x2="73" y2="33" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
                  {/* Label kadaluarsa */}
                  <rect x="22" y="76" width="64" height="16" rx="8" fill="#ef4444" opacity="0.9"/>
                  <text x="54" y="88" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">KADALUARSA</text>
                </svg>
                <span className="absolute top-3 left-3 text-xs bg-red-500 text-white font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                  {/* Shield alert icon */}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                  </svg>
                  Investigasi
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-xs text-muted-foreground mb-2">7 Mar 2026</span>
                <h3 className="font-heading font-semibold text-foreground mb-2 leading-snug">Temuan Susu Kadaluarsa di SDN Menteng 2</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">Petugas menemukan 50 kotak susu UHT yang melewati tanggal kedaluwarsa dalam gudang penyimpanan.</p>
                <button className="flex items-center gap-1 text-sm text-red-500 font-medium mt-4 hover:gap-2 transition-all">
                  Selengkapnya
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>


            <div className="group relative bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-border/50 flex flex-col animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="relative h-44 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, #22c55e 0%, transparent 60%)' }} />
                <svg width="120" height="100" viewBox="0 0 120 100" fill="none" className="drop-shadow-md">

                  <rect x="20" y="60" width="14" height="22" rx="3" fill="#86efac"/>
                  <rect x="40" y="48" width="14" height="34" rx="3" fill="#4ade80"/>
                  <rect x="60" y="36" width="14" height="46" rx="3" fill="#22c55e"/>
                  <rect x="80" y="22" width="14" height="60" rx="3" fill="#16a34a"/>

                  <circle cx="95" cy="18" r="10" fill="#22c55e" opacity="0.9"/>
                  <polyline points="90,18 94,22 101,13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        
                  <polyline points="22,58 40,44 62,34 82,20" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeDasharray="4 2"/>
                </svg>
                <span className="absolute top-3 left-3 text-xs bg-green-500 text-white font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Positif
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-xs text-muted-foreground mb-2">5 Mar 2026</span>
                <h3 className="font-heading font-semibold text-foreground mb-2 leading-snug">Peningkatan Kualitas Menu di SPPG Ciputat</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">SPPG Ciputat berhasil meningkatkan skor gizi rata-rata dari 72 menjadi 88 dalam 2 bulan terakhir.</p>
                <button className="flex items-center gap-1 text-sm text-green-600 font-medium mt-4 hover:gap-2 transition-all">
                  Selengkapnya
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Card 3 – Lingkungan */}
            <div className="group relative bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-border/50 flex flex-col animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="relative h-44 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #14b8a6 0%, transparent 60%)' }} />
                <svg width="120" height="100" viewBox="0 0 120 100" fill="none" className="drop-shadow-md">
                  {/* Daur ulang / leaf */}
                  <circle cx="60" cy="50" r="30" fill="#99f6e4" opacity="0.4"/>
                  {/* Leaf shape */}
                  <path d="M60 25 C80 25 85 45 70 60 C60 70 40 65 40 50 C40 35 50 25 60 25Z" fill="#14b8a6" opacity="0.85"/>
                  <path d="M60 70 C60 70 58 55 65 45" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  {/* Recycle arrows */}
                  <path d="M30 55 Q25 45 35 38" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  <path d="M35 38 L30 33 M35 38 L40 35" stroke="#0d9488" strokeWidth="2" strokeLinecap="round"/>
                  {/* Percent badge */}
                  <circle cx="88" cy="25" r="12" fill="#0d9488" opacity="0.9"/>
                  <text x="88" y="30" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">-40%</text>
                </svg>
                <span className="absolute top-3 left-3 text-xs bg-teal-500 text-white font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Lingkungan
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-xs text-muted-foreground mb-2">3 Mar 2026</span>
                <h3 className="font-heading font-semibold text-foreground mb-2 leading-snug">Program Zero Waste di SDN Cibubur 3</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">Inisiatif pengurangan sisa makanan berhasil mengurangi limbah organik hingga 40% dalam sebulan.</p>
                <button className="flex items-center gap-1 text-sm text-teal-600 font-medium mt-4 hover:gap-2 transition-all">
                  Selengkapnya
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>


          <div className="text-center mt-10">
            <Link to="/edukasi">
              <Button variant="outline" size="lg" className="rounded-xl px-8">
                Lihat Semua Berita <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>



      {/* CTA */}
      <section className="py-24 gradient-hero relative overflow-hidden">

        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">

            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/25 backdrop-blur flex items-center justify-center shadow-lg">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>

            <h2 className="font-heading text-2xl md:text-4xl font-bold text-primary-foreground mb-4 leading-tight">
              Punya keluhan soal makanan di sekolah?
            </h2>
            <p className="text-primary-foreground/80 mb-8  text-base leading-relaxed">
              Suara Anda penting! Laporkan sekarang agar segera ditindaklanjuti oleh pihak berwenang dan tim monitoring kami.
            </p>


            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/laporan">
                <Button size="lg" variant="secondary" className="rounded-xl px-8 h-12 text-base font-semibold shadow-lg hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  Buat Laporan
                </Button>
              </Link>
              <Link to="/monitoring-kasus">
                <Button size="lg" variant="ghost" className="rounded-xl px-8 h-12 text-base text-primary-foreground border border-primary-foreground/30 hover:bg-white/10">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                  Lihat Monitoring Kasus
                </Button>
              </Link>
            </div>

           
          </div>
        </div>
      </section>

   
    </div>
  );
};

export default LandingPage;
