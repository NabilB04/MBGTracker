import React, { useEffect, useRef, useState } from 'react';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import { monitoringKasusList, statusConfig, kasusPerBulan } from '@/data/mockData';
import { AlertTriangle, CheckCircle2, Clock, MapPin, Filter, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



const LeafletMap: React.FC<{ cases: typeof monitoringKasusList; selected: string | null; onSelect: (id: string) => void }> = ({ cases, selected, onSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      const L = (window as any).L;
      if (!mapRef.current) return;

      const map = L.map(mapRef.current, { zoomControl: true, scrollWheelZoom: false }).setView([-6.28, 106.82], 10);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CARTO',
        maxZoom: 19,
      }).addTo(map);

      cases.forEach(k => {
        const cfg = statusConfig[k.status];
        const iconSvg = k.status === 'aktif'
          ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
          : k.status === 'investigasi'
          ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`
          : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

        const markerHtml = `
          <div style="
            width:36px;height:36px;border-radius:50%;
            background:${cfg.color};
            border:3px solid white;
            box-shadow:0 3px 12px ${cfg.color}66;
            display:flex;align-items:center;justify-content:center;
            cursor:pointer;
            transition:transform 0.2s;
          ">
            ${iconSvg}
          </div>`;

        const icon = L.divIcon({ html: markerHtml, className: '', iconSize: [36, 36], iconAnchor: [18, 18] });
        const marker = L.marker([k.lat, k.lng], { icon }).addTo(map);

        marker.bindPopup(`
          <div style="font-family:sans-serif;min-width:220px;padding:4px">
            <div style="font-weight:700;font-size:13px;color:#1F2937;margin-bottom:4px">${k.lokasi}</div>
            <div style="display:inline-block;background:${cfg.bg};color:${cfg.color};font-size:11px;font-weight:600;padding:2px 8px;border-radius:999px;margin-bottom:8px">${cfg.label}</div>
            <div style="font-size:12px;color:#6B7280;margin-bottom:4px"><strong>Jenis:</strong> ${k.jenisKasus}</div>
            <div style="font-size:12px;color:#6B7280;margin-bottom:4px"><strong>Tanggal:</strong> ${k.tanggal}</div>
            ${k.korban > 0 ? `<div style="font-size:12px;color:#FC5F53;font-weight:600">${k.korban} siswa terdampak</div>` : ''}
            <div style="font-size:11.5px;color:#9CA3AF;margin-top:6px;line-height:1.5">${k.deskripsi}</div>
          </div>
        `, { maxWidth: 280 });

        marker.on('click', () => onSelect(k.id));
      });
    };
    document.head.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: 12, zIndex: 0 }} />;
};


const MonitoringKasusPage: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('semua');
  const [search, setSearch] = useState('');

  const aktif       = monitoringKasusList.filter(k => k.status === 'aktif').length;
  const investigasi = monitoringKasusList.filter(k => k.status === 'investigasi').length;
  const selesai     = monitoringKasusList.filter(k => k.status === 'selesai').length;

  const filtered = monitoringKasusList.filter(k => {
    const matchStatus = filterStatus === 'semua' || k.status === filterStatus;
    const matchSearch = k.lokasi.toLowerCase().includes(search.toLowerCase()) || k.jenisKasus.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const selectedCase = monitoringKasusList.find(k => k.id === selected);

  return (
    <div style={{ background: '#F7F8FA', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, background: '#FFF1F0', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={20} color="#FC5F53" />
            </div>
            <h1 style={{ fontFamily: 'inherit', fontSize: 28, fontWeight: 700, color: '#1F2937' }}>Monitoring Kasus</h1>
          </div>
          <p style={{ color: '#6B7280', fontSize: 15 }}>Pantau kasus terkait program MBG di wilayah Jabodetabek secara real-time</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { icon: AlertTriangle, label: 'Total Kasus Bulan Ini', value: monitoringKasusList.length, color: '#1F2937', bg: '#F7F8FA', border: '#E8ECF0' },
            { icon: AlertTriangle, label: 'Kasus Aktif', value: aktif, color: '#FC5F53', bg: '#FFF1F0', border: '#FECACA' },
            { icon: Clock, label: 'Dalam Investigasi', value: investigasi, color: '#F59E0B', bg: '#FFF8EC', border: '#FDE68A' },
            { icon: CheckCircle2, label: 'Sudah Diselesaikan', value: selesai, color: '#2D6A4F', bg: '#EBF5F0', border: '#A7D9C3' },
          ].map((s, i) => (
            <div key={i} style={{ background: s.bg, borderRadius: 14, padding: '20px 22px', border: `1px solid ${s.border}` }}>
              <s.icon size={20} color={s.color} style={{ marginBottom: 10 }} />
              <div style={{ fontSize: 32, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 12.5, color: '#6B7280', marginTop: 6, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>


        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, marginBottom: 24 }}>


          <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', overflow: 'hidden', border: '1px solid #E8ECF0' }}>
            <div style={{ padding: '18px 20px 12px', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: '#1F2937' }}>Peta Sebaran Kasus</h3>
                <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>Klik marker untuk detail kasus</p>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {Object.entries(statusConfig).map(([k, v]) => (
                  <span key={k} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6B7280' }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: v.color, display: 'inline-block' }} />
                    {v.label}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ height: 420 }}>
              <LeafletMap cases={monitoringKasusList} selected={selected} onSelect={setSelected} />
            </div>
          </div>


          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            <div style={{ background: 'white', borderRadius: 14, padding: '16px', border: '1px solid #E8ECF0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ position: 'relative', marginBottom: 12 }}>
                <Search size={14} color="#9CA3AF" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  placeholder="Cari sekolah atau jenis kasus..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px 9px 32px', borderRadius: 8, border: '1px solid #E8ECF0', fontSize: 13, outline: 'none', fontFamily: 'inherit', color: '#1F2937', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['semua', 'aktif', 'investigasi', 'selesai'].map(s => (
                  <button key={s} onClick={() => setFilterStatus(s)} style={{
                    flex: 1, padding: '6px 4px', borderRadius: 8, border: 'none', fontSize: 11.5, fontWeight: 600, cursor: 'pointer',
                    background: filterStatus === s ? (s === 'semua' ? '#1F2937' : statusConfig[s]?.color || '#1F2937') : '#F7F8FA',
                    color: filterStatus === s ? 'white' : '#6B7280',
                    transition: 'all 0.15s',
                    textTransform: 'capitalize',
                  }}>
                    {s === 'semua' ? 'Semua' : statusConfig[s].label}
                  </button>
                ))}
              </div>
            </div>


            <div style={{ background: 'white', borderRadius: 14, border: '1px solid #E8ECF0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden', flex: 1 }}>
              <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0' }}>
                <h3 style={{ fontWeight: 700, fontSize: 14, color: '#1F2937' }}>Daftar Kasus ({filtered.length})</h3>
              </div>
              <div style={{ maxHeight: 330, overflowY: 'auto' }}>
                {filtered.map(k => {
                  const cfg = statusConfig[k.status];
                  const isSelected = selected === k.id;
                  return (
                    <div key={k.id} onClick={() => setSelected(isSelected ? null : k.id)} style={{
                      padding: '14px 16px', borderBottom: '1px solid #F7F8FA', cursor: 'pointer',
                      background: isSelected ? '#FFF1F0' : 'transparent',
                      borderLeft: isSelected ? `3px solid #FC5F53` : '3px solid transparent',
                      transition: 'all 0.15s',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 12.5, fontWeight: 600, color: '#1F2937', lineHeight: 1.4, flex: 1 }}>{k.lokasi}</span>
                        <span style={{ fontSize: 10.5, fontWeight: 700, color: cfg.color, background: cfg.bg, padding: '2px 8px', borderRadius: 999, whiteSpace: 'nowrap', flexShrink: 0 }}>{cfg.label}</span>
                      </div>
                      <div style={{ fontSize: 11.5, color: '#9CA3AF', marginBottom: 3 }}>{k.jenisKasus} · {k.tanggal}</div>
                      {k.korban > 0 && <div style={{ fontSize: 11.5, color: '#FC5F53', fontWeight: 600 }}>⚠️ {k.korban} siswa terdampak</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>


        {selectedCase && (
          <div style={{ background: 'white', borderRadius: 16, padding: '24px', border: `2px solid #FC5F53`, marginBottom: 24, boxShadow: '0 4px 20px rgba(252,95,83,0.12)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#9CA3AF', background: '#F7F8FA', padding: '2px 10px', borderRadius: 999 }}>{selectedCase.id}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: statusConfig[selectedCase.status].color, background: statusConfig[selectedCase.status].bg, padding: '2px 10px', borderRadius: 999 }}>{statusConfig[selectedCase.status].label}</span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 18, color: '#1F2937' }}>{selectedCase.lokasi}</h3>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#9CA3AF' }}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
              {[
                { label: 'Jenis Kasus', value: selectedCase.jenisKasus },
                { label: 'Tanggal', value: selectedCase.tanggal },
                { label: 'Siswa Terdampak', value: selectedCase.korban > 0 ? `${selectedCase.korban} siswa` : 'Tidak ada' },
                { label: 'Koordinat', value: `${selectedCase.lat}, ${selectedCase.lng}` },
              ].map((d, i) => (
                <div key={i} style={{ background: '#F7F8FA', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{d.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>{d.value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#F7F8FA', borderRadius: 10, padding: '14px 16px', marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>Deskripsi Kasus</div>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.65 }}>{selectedCase.deskripsi}</p>
            </div>
            <div style={{ background: '#EBF5F0', borderRadius: 10, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <CheckCircle2 size={16} color="#2D6A4F" style={{ marginTop: 1, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 11, color: '#2D6A4F', fontWeight: 700, marginBottom: 3 }}>TINDAK LANJUT</div>
                <div style={{ fontSize: 13.5, color: '#2D6A4F' }}>{selectedCase.penanganan}</div>
              </div>
            </div>
          </div>
        )}


        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

          <div style={{ background: 'white', borderRadius: 16, padding: '24px', border: '1px solid #E8ECF0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: '#1F2937', marginBottom: 4 }}>Kasus per Bulan</h3>
            <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 20 }}>Sep 2025 – Mar 2026</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={kasusPerBulan} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                <XAxis dataKey="bulan" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontSize: 13 }} />
                <Bar dataKey="kasus" fill="#FC5F53" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Table ringkasan */}
          <div style={{ background: 'white', borderRadius: 16, padding: '24px', border: '1px solid #E8ECF0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: '#1F2937', marginBottom: 4 }}>Ringkasan Semua Kasus</h3>
            <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 16 }}>Semua kasus yang tercatat</p>
            <div style={{ overflowY: 'auto', maxHeight: 240 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #F0F0F0' }}>
                    {['ID', 'Jenis', 'Tanggal', 'Status'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '6px 10px', fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {monitoringKasusList.map(k => {
                    const cfg = statusConfig[k.status];
                    return (
                      <tr key={k.id} onClick={() => setSelected(k.id)} style={{ borderBottom: '1px solid #F7F8FA', cursor: 'pointer', background: selected === k.id ? '#FFF1F0' : 'transparent', transition: 'background 0.15s' }}>
                        <td style={{ padding: '8px 10px', fontWeight: 700, color: '#9CA3AF', fontSize: 11 }}>{k.id}</td>
                        <td style={{ padding: '8px 10px', color: '#374151', fontWeight: 500 }}>{k.jenisKasus}</td>
                        <td style={{ padding: '8px 10px', color: '#9CA3AF', fontSize: 12 }}>{k.tanggal.slice(0, 6)}</td>
                        <td style={{ padding: '8px 10px' }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: cfg.color, background: cfg.bg, padding: '3px 10px', borderRadius: 999 }}>{cfg.label}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MonitoringKasusPage;