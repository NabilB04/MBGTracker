import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ScrambledText from '@/components/ScrambledText';


const CARDS = [
  { 
    img: '/images/card-1.png',
    badge: '', 
  },
  { 
    img: '/images/card-2.jpg',
    badge: '', 
  },
  { 
    img: '/images/card-3.jpg',
    badge: '', 
  },
];

const COL_SETUP = [
  { indices: [0, 1, 2], dir: 'up' as const, speed: 0.5 },
  { indices: [2, 0, 1], dir: 'down' as const, speed: 0.45 },
];

const CARD_H = 185;

const MarqueeCol: React.FC<{ indices: number[]; dir: 'up' | 'down'; speed: number }> = ({ indices, dir, speed }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(dir === 'down' ? -(indices.length * CARD_H) : 0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const totalH = indices.length * CARD_H;
    const animate = () => {
      if (dir === 'up') {
        posRef.current -= speed;
        if (posRef.current <= -totalH) posRef.current += totalH;
      } else {
        posRef.current += speed;
        if (posRef.current >= 0) posRef.current -= totalH;
      }
      track.style.transform = `translateY(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [dir, speed, indices.length]);

  const items = indices.map(i => CARDS[i]);
  const tripled = [...items, ...items, ...items];

  return (
    <div style={{ flex: 1, overflow: 'hidden' }}>
      <div ref={trackRef} style={{ display: 'flex', flexDirection: 'column', gap: 10, willChange: 'transform' }}>
        {tripled.map((card, i) => (
          <div key={i}
            style={{ height: 175, borderRadius: 14, flexShrink: 0, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 12, backgroundImage: `url(${card.img})`, backgroundSize: 'cover',backgroundPosition: 'center', }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.05) 60%,transparent)' }} />
            {card.badge && <span style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: '0.58rem', fontWeight: 700, padding: '2px 7px', borderRadius: 5 }}>{card.badge}</span>}
            <p style={{ position: 'relative', zIndex: 1, color: (card as any).red ? '#FF6B6B' : '#fff', fontWeight: 700, fontSize: '0.78rem', lineHeight: 1.3 }}></p>
          </div> 
        ))}
      </div>
    </div>
  );
};

const useCountUp = (end: number) => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      let cur = 0;
      const step = end / (1800 / 16);
      const t = setInterval(() => {
        cur += step;
        if (cur >= end) { el.textContent = end.toLocaleString('id-ID'); clearInterval(t); }
        else el.textContent = Math.floor(cur).toLocaleString('id-ID');
      }, 16);
      obs.disconnect();
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end]);
  return ref;
};

const LandingPage: React.FC = () => {
  const bannerRef = useCountUp(1645);
  const s1Ref = useCountUp(30);
  const s2Ref = useCountUp(2967);

  const N = { fontFamily: "'Nunito', sans-serif" };

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", background: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@800;900&family=Sora:wght@400;600;700&display=swap');
        .mbg-cta:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(0,0,0,0.25); }
        .mbg-check:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(232,51,74,0.4); }
        .mbg-ftlink:hover { color: #fff !important; }
      `}</style>

      {/* HERO */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh', background: '#E8334A', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 2.5rem 3rem 3rem' }}>
          <h1 style={{ ...N, fontSize: 'clamp(2rem,3.5vw,3.2rem)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: '1.2rem' }}>
          <ScrambledText
            className="scrambled-text-demo"
            radius={100}
            duration={1.2}
            speed={0.5}
            scrambleChars=".:"
            >
              Pantau Program Makan <br /> Bergizi Gratis<br />
              Secara Akurat Melalui <br /> Jemari Anda
            </ScrambledText>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.82rem', lineHeight: 1.75, maxWidth: 400, marginBottom: '2rem', textAlign: 'justify' }}>
            Platform kami menyediakan informasi seputar statistik gizi, penerima dan waste harian dari program MBG yang di laksanakan oleh Badan Gizi Nasional
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            {/* Laporan card */}
            <Link to="/laporan" className="mbg-cta" style={{ flex: 1, borderRadius: 18, padding: '1rem 1.2rem', background: '#2D6A4F', display: 'flex', flexDirection: 'column', gap: 4, textDecoration: 'none', position: 'relative', overflow: 'hidden', minHeight: 130, transition: 'transform .2s, box-shadow .2s' }}>
              <div style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', marginBottom: 4 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </div>
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600, lineHeight: 1.4 }}>Terdapat keluhan?<br />Segera Laporkan!</p>
              <p style={{ ...N, fontSize: '1.4rem', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginTop: 'auto' }}>Laporan</p>
              <span style={{ fontSize: '2rem', position: 'absolute', bottom: 8, right: 10 }}>🌮</span>
            </Link>
            {/* Waste Monitoring card */}
            <Link to="/monitoring-kasus" className="mbg-cta" style={{ flex: 1, borderRadius: 18, padding: '1rem 1.2rem', background: '#F4C430', display: 'flex', flexDirection: 'column', gap: 4, textDecoration: 'none', position: 'relative', overflow: 'hidden', minHeight: 130, transition: 'transform .2s, box-shadow .2s' }}>
              <div style={{ width: 28, height: 28, background: 'rgba(0,0,0,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', marginBottom: 4 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </div>
              <p style={{ fontSize: '0.72rem', color: 'rgba(0,0,0,0.65)', fontWeight: 600, lineHeight: 1.4 }}>Penasaran dengan<br />data sisa makanan?</p>
              <p style={{ ...N, fontSize: '1.4rem', fontWeight: 900, color: '#111', lineHeight: 1.1, marginTop: 'auto' }}>Waste<br />Monitoring</p>
              <span style={{ fontSize: '2rem', position: 'absolute', bottom: 8, right: 10 }}>🍵</span>
            </Link>
          </div>
        </div>

        {/* Marquee right */}
        <div style={{ display: 'flex', gap: 10, padding: '1.2rem 1.2rem 1.2rem 4rem', overflow: 'hidden', height: '100vh', transform: 'rotate(-5deg) scale(1.1)', transformOrigin: 'center center',  }}>
          {COL_SETUP.map((col, i) => <MarqueeCol key={i} {...col} />)}
        </div>
      </section>

      {/* STATS BANNER */}
      <div style={{ background: '#8B0000', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 3.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {[0.1, 0.2].map((op, i) => <div key={i} style={{ width: 0, height: 0, borderTop: '22px solid transparent', borderBottom: '22px solid transparent', borderLeft: `18px solid rgba(255,255,255,${op})` }} />)}
          </div>
          <span style={{ ...N, fontSize: '1.4rem', fontWeight: 900, color: '#fff' }}>Jumlah Total Laporan</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ ...N, fontSize: '2.6rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>
            <span ref={bannerRef as React.RefObject<HTMLSpanElement>}>0</span>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.8rem', fontWeight: 600 }}>Laporan</div>
        </div>
      </div>

      {/* PHOTO STATS */}
      <div style={{ position: 'relative', minHeight: 420, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        
        {/*Bg*/}
        <div style={{ 
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/bg-siswa.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }} />
        
        {/* Overlay Putih*/}
        <div style={{ 
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.75) 100%)'
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(255,255,255,0.72) 0%,rgba(255,255,255,0.38) 40%,rgba(255,255,255,0.72) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem 5rem', marginBottom: '2.5rem' }}>
            {[{ ref: s1Ref, label: 'Jumlah Sekolah\nPenerima MBG' }, { ref: s2Ref, label: 'Total Jumlah\nSiswa Penerima' }].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <span ref={item.ref as React.RefObject<HTMLSpanElement>} style={{ ...N, fontSize: 'clamp(3rem,5vw,4.5rem)', fontWeight: 900, color: '#1a1a2e', display: 'block', lineHeight: 1 }}>0</span>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1a1a2e', marginTop: 4, lineHeight: 1.35, whiteSpace: 'pre-line' }}>{item.label}</p>
              </div>
            ))}
          </div>
          <Link to="/monitoring-kasus" className="mbg-check" style={{ display: 'inline-block', background: '#E8334A', color: '#fff', ...N, fontWeight: 800, fontSize: '0.95rem', padding: '.85rem 2.2rem', borderRadius: 50, textDecoration: 'none', transition: 'transform .2s, box-shadow .2s' }}>
            Periksa Hasil Tindak Lanjut Laporan Anda !
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#1a1a1a', padding: '2.5rem 3.5rem', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr auto', gap: '2rem', alignItems: 'start' }}>
        <div>
          <div style={{ color: '#E8334A', ...N, fontSize: '1.6rem', fontWeight: 900 }}>MbgTrack</div>
          <p style={{ color: '#888', fontSize: '0.75rem', marginTop: 4 }}>Platform Monitoring Program MBG untuk Anda</p>
        </div>
        {[
          { title: 'Layanan Utama', links: [['Laporan','/laporan'],['AI Scanner','/ai-scanner'],['Waste Monitoring','/waste-monitoring'],['Case Monitoring','/monitoring-kasus']] },
          { title: 'Informasi Gizi', links: [['Artikel Gizi','/edukasi'],['Menu Makanan','/menu-sekolah']] },
          { title: 'Kontak & Bantuan', links: [] },
        ].map((col, i) => (
          <div key={i}>
            <h4 style={{ color: '#E8334A', fontWeight: 700, fontSize: '0.78rem', marginBottom: '.8rem' }}>{col.title}</h4>
            {(col.links as string[][]).map(([label, to], j) => (
              <Link key={j} to={to} className="mbg-ftlink" style={{ display: 'block', color: '#bbb', fontSize: '0.75rem', textDecoration: 'none', marginBottom: '.4rem' }}>{label}</Link>
            ))}
          </div>
        ))}
        <div>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>🍱</div>
          <p style={{ color: '#E8334A', fontSize: '0.65rem', marginTop: '.4rem', textAlign: 'center' }}>©MbgTrack Copyright</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;