import React, { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  ScanLine, Loader2, CheckCircle2, AlertTriangle, RotateCcw,
  Cpu, FlaskConical, ShieldCheck, History, ChevronRight,
  Flame, Dumbbell, Wheat, Droplets, Salad, TrendingUp, Info,
  Camera, Clock, Calendar, User,
} from 'lucide-react';


const mockResult = {
  items: [
    { nama: 'Nasi Putih (1 porsi ~200g)',  confidence: 96, kalori: 260, icon: '🌾' },
    { nama: 'Ayam Goreng (1 potong ~80g)', confidence: 91, kalori: 195, icon: '🍗' },
    { nama: 'Sayur Bayam Rebus (~75g)',    confidence: 84, kalori: 35,  icon: '🥬' },
    { nama: 'Tempe Goreng (~50g)',          confidence: 79, kalori: 110, icon: '🟫' },
    { nama: 'Buah Pepaya (~100g)',          confidence: 72, kalori: 46,  icon: '🍊' },
  ],
  nutrition: [
    { key: 'kalori',      label: 'Kalori',       value: 646, unit: 'kkal', akg: 850,  Icon: Flame,     color: '#FC5F53', bg: '#FFF1F0' },
    { key: 'protein',     label: 'Protein',      value: 32,  unit: 'g',    akg: 40,   Icon: Dumbbell,  color: '#2D6A4F', bg: '#EBF5F0' },
    { key: 'karbohidrat', label: 'Karbohidrat',  value: 78,  unit: 'g',    akg: 130,  Icon: Wheat,     color: '#F59E0B', bg: '#FFF8EC' },
    { key: 'lemak',       label: 'Lemak',        value: 18,  unit: 'g',    akg: 28,   Icon: Droplets,  color: '#8B5CF6', bg: '#F3F0FF' },
    { key: 'serat',       label: 'Serat',        value: 6,   unit: 'g',    akg: 20,   Icon: Salad,     color: '#0891B2', bg: '#E0F7FA' },
  ],
  memenuhi: true,
  skor: 82,
  rekomendasi: 'Menu sudah cukup baik. Tambahkan sumber serat seperti buah atau sayuran tambahan untuk memenuhi target serat harian.',
};

const scanHistory = [
  {
    id: 'SC003', date: '08 Mar 2026', time: '12.14 WIB',
    menu: 'Nasi + Ayam Goreng + Sayur Bayam + Tempe + Pepaya',
    kalori: 646, skor: 82, status: 'memenuhi',
    sekolah: 'SDN Ciputat 1',
  },
  {
    id: 'SC002', date: '07 Mar 2026', time: '12.08 WIB',
    menu: 'Nasi + Ikan Goreng + Kangkung + Tahu + Jeruk',
    kalori: 690, skor: 88, status: 'memenuhi',
    sekolah: 'SDN Ciputat 1',
  },
  {
    id: 'SC001', date: '06 Mar 2026', time: '12.22 WIB',
    menu: 'Nasi + Tempe + Tahu + Sayur Sop',
    kalori: 520, skor: 61, status: 'perlu-perbaikan',
    sekolah: 'SDN Ciputat 1',
  },
];

const pct = (val: number, akg: number) => Math.min(Math.round((val / akg) * 100), 100);

const ProgressBar: React.FC<{ value: number; color: string; bg: string }> = ({ value, color, bg }) => (
  <div style={{ height: 8, borderRadius: 999, background: bg, overflow: 'hidden' }}>
    <div
      style={{
        height: '100%', borderRadius: 999, background: color,
        width: `${value}%`, transition: 'width 1s cubic-bezier(.22,.68,0,1.1)',
      }}
    />
  </div>
);


const StepBadge: React.FC<{ n: number; label: string; active: boolean }> = ({ n, label, active }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <div style={{
      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
      background: active ? '#FC5F53' : '#E8ECF0',
      color: active ? 'white' : '#9CA3AF',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, fontWeight: 700, transition: 'all 0.3s',
    }}>{n}</div>
    <span style={{ fontSize: 13, fontWeight: 600, color: active ? '#1F2937' : '#9CA3AF', transition: 'color 0.3s' }}>{label}</span>
  </div>
);


const ScoreRing: React.FC<{ skor: number }> = ({ skor }) => {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const offset = circ - (skor / 100) * circ;
  const color = skor >= 80 ? '#2D6A4F' : skor >= 60 ? '#F59E0B' : '#FC5F53';

  return (
    <div style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
      <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="60" cy="60" r={r} fill="none" stroke="#F0F0F0" strokeWidth="10" />
        <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1.2s ease' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 26, fontWeight: 800, color, lineHeight: 1 }}>{skor}</span>
        <span style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600 }}>/ 100</span>
      </div>
    </div>
  );
};


const AIScannerPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [hasImage, setHasImage] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('');
  const [result, setResult] = useState<typeof mockResult | null>(null);

  const steps = [
    { label: 'Preprocessing gambar...', duration: 600 },
    { label: 'Mendeteksi objek makanan...', duration: 700 },
    { label: 'Mengidentifikasi bahan...', duration: 600 },
    { label: 'Menghitung nilai nutrisi...', duration: 400 },
    { label: 'Membandingkan dengan AKG...', duration: 200 },
  ];

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setProgress(0);
    let acc = 0;
    for (const step of steps) {
      setProgressLabel(step.label);
      await new Promise(r => setTimeout(r, step.duration));
      acc += 100 / steps.length;
      setProgress(Math.min(Math.round(acc), 99));
    }
    setProgress(100);
    await new Promise(r => setTimeout(r, 200));
    setResult(mockResult);
    setAnalyzing(false);
  };

  const handleReset = () => { setResult(null); setHasImage(false); setProgress(0); };

  const card = (extra?: React.CSSProperties): React.CSSProperties => ({
    background: 'white', borderRadius: 16,
    border: '1px solid #E8ECF0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    ...extra,
  });

  return (
    <div style={{ background: '#F7F8FA', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: isMobile ? '24px 16px' : '40px 24px' }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: isMobile ? 24 : 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 40, height: 40, background: '#FFF1F0', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ScanLine size={20} color="#FC5F53" />
            </div>
            <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: '#1F2937' }}>AI Nutrition Scanner</h1>
          </div>
          <p style={{ color: '#6B7280', fontSize: isMobile ? 13 : 15, paddingLeft: 2 }}>
            Deteksi kandungan gizi menu MBG secara otomatis menggunakan kecerdasan buatan
          </p>
        </div>


        <div style={{ background: '#EBF5F0', borderRadius: 12, padding: '12px 16px', marginBottom: 24, display: 'flex', gap: 10, alignItems: 'flex-start', border: '1px solid #A7D9C3' }}>
          <Info size={15} color="#2D6A4F" style={{ marginTop: 1, flexShrink: 0 }} />
          <p style={{ fontSize: 13, color: '#2D6A4F', lineHeight: 1.6 }}>
            <strong>Cara kerja:</strong> Upload foto piring makan MBG, AI akan mendeteksi jenis makanan, memperkirakan porsi, lalu menghitung nilai nutrisi dan membandingkannya dengan standar AKG anak sekolah 
          </p>
        </div>

     
        {!result && (
          <div style={{ display: 'flex', gap: isMobile ? 16 : 32, marginBottom: 24, flexWrap: 'wrap' }}>
            <StepBadge n={1} label="Upload Foto" active={true} />
            <ChevronRight size={16} color="#D1D5DB" style={{ marginTop: 6 }} />
            <StepBadge n={2} label="Analisis AI" active={hasImage} />
            <ChevronRight size={16} color="#D1D5DB" style={{ marginTop: 6 }} />
            <StepBadge n={3} label="Lihat Hasil" active={false} />
          </div>
        )}

        {/* ── Main scanner card ── */}
        <div style={card({ padding: isMobile ? '20px 18px' : '28px 32px', marginBottom: 20 })}>

          {/* UPLOAD STATE */}
          {!result && !analyzing && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Camera size={16} color="#FC5F53" />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>Upload Foto Menu MBG</span>
              </div>
              <ImageUpload onImageSelect={() => setHasImage(true)} label="Seret foto ke sini atau klik untuk memilih (JPG / PNG, maks. 5MB)" />
              <div style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Format JPG / PNG', 'Maks. 5MB', 'Foto dari atas disarankan'].map((t, i) => (
                  <span key={i} style={{ fontSize: 11.5, color: '#9CA3AF', background: '#F7F8FA', padding: '4px 10px', borderRadius: 6, border: '1px solid #E8ECF0' }}>{t}</span>
                ))}
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!hasImage}
                style={{
                  marginTop: 20, width: '100%', padding: '14px', borderRadius: 10, border: 'none',
                  background: hasImage ? '#FC5F53' : '#E8ECF0',
                  color: hasImage ? 'white' : '#9CA3AF',
                  fontWeight: 700, fontSize: 15, cursor: hasImage ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'all 0.2s',
                  boxShadow: hasImage ? '0 4px 16px rgba(252,95,83,0.3)' : 'none',
                }}
              >
                <Cpu size={18} /> Mulai Analisis AI
              </button>
            </div>
          )}

          {/* ANALYZING STATE */}
          {analyzing && (
            <div style={{ textAlign: 'center', padding: isMobile ? '24px 0' : '36px 0' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#FFF1F0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Loader2 size={32} color="#FC5F53" style={{ animation: 'spin 1s linear infinite' }} />
              </div>
              <p style={{ fontWeight: 700, fontSize: 17, color: '#1F2937', marginBottom: 6 }}>AI Sedang Menganalisis</p>
              <p style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 24 }}>{progressLabel}</p>

          
              <div style={{ maxWidth: 400, margin: '0 auto', marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9CA3AF', marginBottom: 6 }}>
                  <span>Progres analisis</span>
                  <span>{progress}%</span>
                </div>
                <div style={{ height: 8, background: '#F0F0F0', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: '#FC5F53', borderRadius: 999, width: `${progress}%`, transition: 'width 0.4s ease' }} />
                </div>
              </div>

             
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320, margin: '0 auto', marginTop: 20 }}>
                {[
                  { Icon: FlaskConical, label: 'Preprocessing gambar' },
                  { Icon: ScanLine,     label: 'Deteksi objek makanan' },
                  { Icon: Cpu,          label: 'Identifikasi bahan' },
                  { Icon: TrendingUp,   label: 'Kalkulasi nutrisi' },
                  { Icon: ShieldCheck,  label: 'Evaluasi standar AKG' },
                ].map(({ Icon, label }, i) => {
                  const done = progress >= (i + 1) * 20;
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: done ? '#EBF5F0' : '#F7F8FA', border: `1px solid ${done ? '#A7D9C3' : '#E8ECF0'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s' }}>
                        <Icon size={13} color={done ? '#2D6A4F' : '#D1D5DB'} />
                      </div>
                      <span style={{ fontSize: 12.5, color: done ? '#2D6A4F' : '#9CA3AF', fontWeight: done ? 600 : 400, transition: 'all 0.3s' }}>{label}</span>
                      {done && <CheckCircle2 size={13} color="#2D6A4F" style={{ marginLeft: 'auto' }} />}
                    </div>
                  );
                })}
              </div>

              <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

        
          {result && (
            <div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                    {result.memenuhi ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#EBF5F0', color: '#2D6A4F', padding: '6px 14px', borderRadius: 999, fontSize: 13, fontWeight: 700, border: '1px solid #A7D9C3' }}>
                        <CheckCircle2 size={14} /> Memenuhi Standar Gizi
                      </span>
                    ) : (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#FFF8EC', color: '#D97706', padding: '6px 14px', borderRadius: 999, fontSize: 13, fontWeight: 700, border: '1px solid #FDE68A' }}>
                        <AlertTriangle size={14} /> Perlu Perbaikan
                      </span>
                    )}
                  </div>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1F2937', marginBottom: 4 }}>Hasil Analisis Nutrisi</h2>
                  <p style={{ fontSize: 13, color: '#9CA3AF' }}>Berdasarkan AKG anak usia 7–12 tahun (PERMENKES 2019)</p>
                </div>
                <ScoreRing skor={result.skor} />
              </div>

           
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
                  <ScanLine size={15} color="#FC5F53" />
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1F2937' }}>Makanan Terdeteksi</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {result.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#F7F8FA', borderRadius: 10, padding: '11px 14px', border: '1px solid #F0F0F0' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: 'white', border: '1px solid #E8ECF0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                        {item.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1F2937', marginBottom: 3 }}>{item.nama}</div>
                        <div style={{ height: 4, background: '#E8ECF0', borderRadius: 999, overflow: 'hidden', maxWidth: 180 }}>
                          <div style={{ height: '100%', width: `${item.confidence}%`, background: item.confidence > 85 ? '#2D6A4F' : item.confidence > 70 ? '#F59E0B' : '#FC5F53', borderRadius: 999 }} />
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: item.confidence > 85 ? '#2D6A4F' : item.confidence > 70 ? '#F59E0B' : '#FC5F53' }}>{item.confidence}%</div>
                        <div style={{ fontSize: 10.5, color: '#9CA3AF' }}>keyakinan</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

     
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
                  <FlaskConical size={15} color="#FC5F53" />
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1F2937' }}>Kandungan Nutrisi vs AKG</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {result.nutrition.map(n => {
                    const p = pct(n.value, n.akg);
                    return (
                      <div key={n.key}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                          <div style={{ width: 30, height: 30, borderRadius: 8, background: n.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <n.Icon size={14} color={n.color} />
                          </div>
                          <span style={{ fontSize: 13.5, fontWeight: 600, color: '#1F2937', flex: 1 }}>{n.label}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: n.color }}>{n.value} {n.unit}</span>
                          <span style={{ fontSize: 11.5, color: '#9CA3AF', minWidth: 50, textAlign: 'right' }}>dari {n.akg} {n.unit}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ flex: 1 }}>
                            <ProgressBar value={p} color={n.color} bg={n.bg} />
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 700, color: n.color, minWidth: 38, textAlign: 'right' }}>{p}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>


              <div style={{ background: '#FFF8EC', border: '1px solid #FDE68A', borderRadius: 12, padding: '14px 16px', marginBottom: 20, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <TrendingUp size={15} color="#D97706" style={{ marginTop: 1, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: '#D97706', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Rekomendasi AI</div>
                  <p style={{ fontSize: 13.5, color: '#92400E', lineHeight: 1.65 }}>{result.rekomendasi}</p>
                </div>
              </div>

              <button onClick={handleReset} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 20px', borderRadius: 10, border: '1.5px solid #E8ECF0', background: 'white', fontWeight: 600, fontSize: 14, color: '#374151', cursor: 'pointer', transition: 'all 0.15s' }}>
                <RotateCcw size={15} /> Scan Menu Lain
              </button>
            </div>
          )}
        </div>

      
        <div style={card({ padding: isMobile ? '18px 16px' : '24px 28px' })}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <History size={16} color="#6B7280" />
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1F2937' }}>Riwayat Scan</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {scanHistory.map((h, i) => {
              const cfg = h.status === 'memenuhi'
                ? { color: '#2D6A4F', bg: '#EBF5F0', border: '#A7D9C3', label: 'Memenuhi', Icon: CheckCircle2 }
                : { color: '#D97706', bg: '#FFF8EC', border: '#FDE68A', label: 'Perlu Perbaikan', Icon: AlertTriangle };
              return (
                <div key={i} style={{ background: '#F7F8FA', borderRadius: 12, padding: '14px 16px', border: '1px solid #F0F0F0', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: cfg.bg, border: `1px solid ${cfg.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <cfg.Icon size={18} color={cfg.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: '#1F2937' }}>{h.menu}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: cfg.color, background: cfg.bg, padding: '2px 9px', borderRadius: 999, flexShrink: 0 }}>{cfg.label}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 11.5, color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Calendar size={11} /> {h.date}
                      </span>
                      <span style={{ fontSize: 11.5, color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={11} /> {h.time}
                      </span>
                      <span style={{ fontSize: 11.5, color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Flame size={11} /> {h.kalori} kkal
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: cfg.color }}>{h.skor}</div>
                    <div style={{ fontSize: 10, color: '#9CA3AF' }}>skor gizi</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIScannerPage;