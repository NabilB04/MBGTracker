import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { School, Users, FileText, ArrowRight } from 'lucide-react';

const CountUpNumber: React.FC<{ end: number; suffix?: string }> = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const duration = 1500;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <div ref={ref} className="text-3xl md:text-4xl font-heading font-bold text-primary">{count.toLocaleString('id-ID')}{suffix}</div>;
};

const LandingPage: React.FC = () => {
  const issues = [
    { title: 'Temuan Susu Kadaluarsa di SDN Menteng 2', desc: 'Petugas menemukan 50 kotak susu UHT yang melewati tanggal kedaluwarsa dalam gudang penyimpanan.', date: '7 Mar 2026' },
    { title: 'Peningkatan Kualitas Menu di SPPG Ciputat', desc: 'SPPG Ciputat berhasil meningkatkan skor gizi rata-rata dari 72 menjadi 88 dalam 2 bulan terakhir.', date: '5 Mar 2026' },
    { title: 'Program Zero Waste di SDN Cibubur 3', desc: 'Inisiatif pengurangan sisa makanan berhasil mengurangi limbah organik hingga 40% dalam sebulan.', date: '3 Mar 2026' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-[0.07]" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <span className="text-6xl md:text-7xl block mb-6">🍱</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Pantau Gizi, Jaga Masa Depan{' '}
              <span className="text-primary">Anak Indonesia</span>
            </h1>
            <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Platform monitoring program Makan Bergizi Gratis secara transparan dan real-time
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <Link to="/menu-sekolah">
                <Button size="lg" className="rounded-lg px-6">
                  Lihat Menu Sekolah <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/laporan">
                <Button size="lg" variant="outline" className="rounded-lg px-6">
                  Laporkan Masalah
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: School, label: 'Sekolah Penerima', value: 12450 },
              { icon: Users, label: 'Siswa Penerima', value: 3200000, suffix: '+' },
              { icon: FileText, label: 'Total Laporan Warga', value: 8920 },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-lg bg-background shadow-card animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <CountUpNumber end={stat.value} suffix={stat.suffix} />
                <p className="text-sm text-muted-foreground mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Issues */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-center mb-10">Highlight Isu Terkini</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {issues.map((issue, i) => (
              <div key={i} className="bg-card rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-5 flex flex-col animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-full h-32 rounded-md bg-muted flex items-center justify-center text-4xl mb-4">
                  {['📰', '✅', '♻️'][i]}
                </div>
                <p className="text-xs text-muted-foreground mb-1">{issue.date}</p>
                <h3 className="font-heading font-semibold text-foreground mb-2">{issue.title}</h3>
                <p className="text-sm text-muted-foreground flex-1">{issue.desc}</p>
                <button className="text-sm text-primary font-medium mt-3 text-left hover:underline">Selengkapnya →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Punya keluhan soal makanan di sekolah?
          </h2>
          <p className="text-primary-foreground/80 mb-6">Laporkan sekarang agar segera ditindaklanjuti</p>
          <Link to="/laporan">
            <Button size="lg" variant="secondary" className="rounded-lg px-8">
              Buat Laporan
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-secondary-foreground/60">© 2026 GiziTrack — Platform Monitoring MBG Indonesia</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
