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

      {/* Issues / News */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Berita Terkini</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mt-2">Highlight Isu Terkini</h2>
            <p className="text-muted-foreground mt-2">Informasi terbaru seputar program MBG di Indonesia</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {issues.map((issue, i) => (
              <div key={i} className="bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group animate-fade-in border border-border/50" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-full h-40 bg-muted flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-300">
                  {issue.emoji}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-primary/10 text-primary font-medium px-2 py-0.5 rounded-full">{issue.tag}</span>
                    <span className="text-xs text-muted-foreground">{issue.date}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2 leading-snug">{issue.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{issue.desc}</p>
                  <button className="flex items-center gap-1 text-sm text-primary font-medium mt-3 hover:gap-2 transition-all">
                    Selengkapnya <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground font-medium mb-8 uppercase tracking-wider">Didukung Oleh</p>
          <div className="flex flex-wrap items-center justify-center gap-8 max-w-4xl mx-auto">
            {partners.map((p, i) => (
              <div key={i} className="px-6 py-3 bg-card rounded-xl shadow-card text-sm font-medium text-muted-foreground border border-border/50">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-white/5 blur-3xl" />
        <div className="container mx-auto px-4 text-center relative">
          <span className="text-5xl block mb-4">📢</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Punya keluhan soal makanan di sekolah?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">Suara Anda penting! Laporkan sekarang agar segera ditindaklanjuti oleh pihak berwenang.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/laporan">
              <Button size="lg" variant="secondary" className="rounded-xl px-8 h-12 text-base">
                Buat Laporan <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/monitoring-kasus">
              <Button size="lg" variant="ghost" className="rounded-xl px-8 h-12 text-base text-primary-foreground border border-primary-foreground/30 hover:bg-white/10">
                Lihat Monitoring Kasus
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground">
        {/* Main footer */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🍱</span>
                <span className="font-heading font-bold text-xl">GiziTrack</span>
              </div>
              <p className="text-secondary-foreground/60 text-sm leading-relaxed mb-6">
                Platform monitoring program Makan Bergizi Gratis untuk memastikan setiap anak Indonesia mendapatkan nutrisi terbaik.
              </p>
              <div className="flex items-center gap-3">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider">Menu Utama</h4>
              <ul className="space-y-2.5">
                {['Dashboard', 'Menu Sekolah', 'Laporan Warga', 'Monitoring Kasus', 'Edukasi Gizi', 'AI Scanner'].map((item, i) => (
                  <li key={i}>
                    <Link to={['/', '/menu-sekolah', '/laporan', '/monitoring-kasus', '/edukasi', '/ai-scanner'][i]} className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors flex items-center gap-1">
                      <ChevronRight className="h-3 w-3" />{item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div>
              <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider">Informasi</h4>
              <ul className="space-y-2.5">
                {['Tentang Program MBG', 'Kebijakan Privasi', 'Syarat & Ketentuan', 'FAQ', 'Panduan Pelaporan'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors flex items-center gap-1">
                      <ChevronRight className="h-3 w-3" />{item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider">Hubungi Kami</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-secondary-foreground/60">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  <span>Jl. Jenderal Sudirman Kav. 52-53, Jakarta Selatan 12190</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-secondary-foreground/60">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <span>(021) 1234-5678</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-secondary-foreground/60">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <span>info@gizitrack.id</span>
                </li>
              </ul>
              <div className="mt-5 p-4 rounded-xl bg-secondary-foreground/5 border border-secondary-foreground/10">
                <p className="text-xs text-secondary-foreground/60">Hotline Pengaduan 24 Jam</p>
                <p className="font-heading font-bold text-primary text-lg mt-1">1500-MBG</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-secondary-foreground/10">
          <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-secondary-foreground/40">© 2026 GiziTrack — Platform Monitoring MBG Indonesia. Hak cipta dilindungi.</p>
            <p className="text-xs text-secondary-foreground/40">Dikelola oleh Kementerian Pendidikan & Kebudayaan RI</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
