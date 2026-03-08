import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { BookOpen, Sunrise, Beef, Leaf, ShieldOff, Clock, User, ArrowRight, X, Apple, Droplets, Zap, Brain } from 'lucide-react';
import { artikelList, tips } from '@/data/mockData';



/* ─────────────────────────────────
   ARTICLE MODAL
   ───────────────────────────────── */
const ArticleModal: React.FC<{ artikel: typeof artikelList[0]; onClose: () => void }> = ({ artikel, onClose }) => (
  <div
    onClick={onClose}
    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
  >
    <div
      onClick={e => e.stopPropagation()}
      style={{ background: 'white', borderRadius: 20, maxWidth: 680, width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 60px rgba(0,0,0,0.25)' }}
    >
      <img src={artikel.gambar} alt={artikel.judul} style={{ width: '100%', height: 240, objectFit: 'cover', borderRadius: '20px 20px 0 0' }} />
      <div style={{ padding: '28px 32px 32px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: artikel.katColor, background: artikel.katBg, padding: '3px 12px', borderRadius: 999 }}>{artikel.kategori}</span>
          <span style={{ fontSize: 11.5, color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} /> {artikel.estimasiBaca}</span>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1F2937', lineHeight: 1.35, marginBottom: 12 }}>{artikel.judul}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, fontSize: 13, color: '#6B7280' }}>
          <User size={13} /> {artikel.penulis} · {artikel.tanggal}
        </div>
        <div style={{ borderTop: '1px solid #F0F0F0', paddingTop: 20 }}>
          {artikel.konten.split('\n\n').map((para, i) => (
            <p key={i} style={{ fontSize: 14.5, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>{para}</p>
          ))}
        </div>
        <button
          onClick={onClose}
          style={{ marginTop: 8, width: '100%', padding: '13px', borderRadius: 10, border: 'none', background: '#FC5F53', color: 'white', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
        >
          Tutup Artikel
        </button>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────
   MAIN PAGE
   ───────────────────────────────── */
const EdukasiPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [activeArtikel, setActiveArtikel] = useState<typeof artikelList[0] | null>(null);
  const [filter, setFilter] = useState('Semua');

  const kategoriList = ['Semua', ...Array.from(new Set(artikelList.map(a => a.kategori)))];
  const filtered = filter === 'Semua' ? artikelList : artikelList.filter(a => a.kategori === filter);

  return (
    <div style={{ background: '#F7F8FA', minHeight: '100vh' }}>
      {activeArtikel && <ArticleModal artikel={activeArtikel} onClose={() => setActiveArtikel(null)} />}

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: isMobile ? '24px 16px' : '40px 24px' }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: isMobile ? 24 : 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 40, height: 40, background: '#EBF5F0', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <BookOpen size={20} color="#2D6A4F" />
            </div>
            <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: '#1F2937' }}>Edukasi Gizi</h1>
          </div>
          <p style={{ color: '#6B7280', fontSize: isMobile ? 13 : 15, paddingLeft: 2 }}>
            Artikel dan tips seputar gizi anak sekolah dari para ahli nutrisi terpercaya
          </p>
        </div>

        {/* ── Featured Article ── */}
        <div
          onClick={() => setActiveArtikel(artikelList[0])}
          style={{
            background: 'white', borderRadius: 20, overflow: 'hidden',
            border: '1px solid #E8ECF0', boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            marginBottom: isMobile ? 24 : 36, cursor: 'pointer',
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            transition: 'box-shadow 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(252,95,83,0.12)')}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)')}
        >
          <img
            src={artikelList[0].gambar}
            alt={artikelList[0].judul}
            style={{ width: '100%', height: isMobile ? 200 : '100%', objectFit: 'cover', minHeight: isMobile ? 'unset' : 280 }}
          />
          <div style={{ padding: isMobile ? '20px 20px 24px' : '32px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, fontWeight: 700, background: '#FC5F53', color: 'white', padding: '3px 10px', borderRadius: 999 }}>✦ Artikel Pilihan</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: artikelList[0].katColor, background: artikelList[0].katBg, padding: '3px 10px', borderRadius: 999 }}>{artikelList[0].kategori}</span>
            </div>
            <h2 style={{ fontSize: isMobile ? 17 : 22, fontWeight: 700, color: '#1F2937', lineHeight: 1.35, marginBottom: 12 }}>
              {artikelList[0].judul}
            </h2>
            <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, marginBottom: 20 }}>{artikelList[0].deskripsi}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <div style={{ fontSize: 12.5, color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><User size={12} /> {artikelList[0].penulis}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {artikelList[0].estimasiBaca}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#FC5F53', display: 'flex', alignItems: 'center', gap: 4 }}>
                Baca Selengkapnya <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>

        {/* ── Filter kategori ── */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {kategoriList.map(k => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              style={{
                padding: '7px 16px', borderRadius: 999, border: 'none', fontSize: 12.5,
                fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
                background: filter === k ? '#FC5F53' : 'white',
                color: filter === k ? 'white' : '#6B7280',
                boxShadow: filter === k ? '0 3px 10px rgba(252,95,83,0.3)' : '0 1px 4px rgba(0,0,0,0.06)',
                borderBlock: filter === k ? 'none' : '1px solid #E8ECF0',
              }}
            >
              {k}
            </button>
          ))}
        </div>

        {/* ── Article Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? 16 : 20,
          marginBottom: isMobile ? 36 : 56,
        }}>
          {filtered.slice(1).map(artikel => (
            <div
              key={artikel.id}
              onClick={() => setActiveArtikel(artikel)}
              style={{
                background: 'white', borderRadius: 16, overflow: 'hidden',
                border: '1px solid #E8ECF0', cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'flex', flexDirection: isMobile ? 'row' : 'column',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}
            >
              <img
                src={artikel.gambar}
                alt={artikel.judul}
                style={{
                  width: isMobile ? 110 : '100%',
                  height: isMobile ? '100%' : 180,
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
              />
              <div style={{ padding: isMobile ? '14px 16px' : '18px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: artikel.katColor, background: artikel.katBg, padding: '2px 9px', borderRadius: 999 }}>{artikel.kategori}</span>
                  <span style={{ fontSize: 11, color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: 3 }}><Clock size={10} /> {artikel.estimasiBaca}</span>
                </div>
                <h3 style={{ fontSize: isMobile ? 13 : 14.5, fontWeight: 700, color: '#1F2937', lineHeight: 1.4, marginBottom: 8, flex: 1 }}>
                  {artikel.judul}
                </h3>
                {!isMobile && (
                  <p style={{ fontSize: 12.5, color: '#9CA3AF', lineHeight: 1.6, marginBottom: 14 }}>
                    {artikel.deskripsi.slice(0, 90)}...
                  </p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <span style={{ fontSize: 11.5, color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <User size={11} /> {artikel.penulis.split(',')[0]}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#FC5F53', display: 'flex', alignItems: 'center', gap: 3 }}>
                    Baca <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Tips Gizi ── */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 36, height: 36, background: '#FFF8EC', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Zap size={18} color="#F59E0B" />
            </div>
            <h2 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: '#1F2937' }}>Tips Gizi Harian</h2>
          </div>
          <p style={{ color: '#6B7280', fontSize: 14, marginBottom: isMobile ? 20 : 28, paddingLeft: 2 }}>
            Panduan praktis memenuhi kebutuhan gizi anak setiap hari
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? 12 : 16,
        }}>
          {tips.map(({ Icon, title, desc, color, bg }, i) => (
            <div
              key={i}
              style={{
                background: 'white', borderRadius: 16, padding: isMobile ? '18px 16px' : '22px 20px',
                border: '1px solid #E8ECF0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 10px 28px ${color}20`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}
            >
              <div style={{ width: 44, height: 44, background: bg, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <Icon size={22} color={color} />
              </div>
              <h3 style={{ fontSize: isMobile ? 13 : 14.5, fontWeight: 700, color: '#1F2937', marginBottom: 8 }}>{title}</h3>
              <p style={{ fontSize: isMobile ? 11.5 : 13, color: '#6B7280', lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default EdukasiPage;