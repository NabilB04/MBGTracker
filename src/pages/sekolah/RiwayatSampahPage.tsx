import React from 'react';
import { dataSampahList, getSekolahName } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';

const schoolData = dataSampahList.filter(d => d.sekolahId === 's1');
const weekTotal = schoolData.reduce((a, d) => a + d.organik + d.anorganik, 0);

const RiwayatSampahPage: React.FC = () => (
  <div className="space-y-6 animate-fade-in">
    <h2 className="font-heading text-2xl font-bold">Riwayat Laporan Sampah</h2>

    <div className="bg-card rounded-lg shadow-card p-4">
      <p className="text-sm text-muted-foreground">Total limbah minggu ini: <strong>{weekTotal.toFixed(1)} kg</strong></p>
    </div>

    <div className="bg-card rounded-lg shadow-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="py-3 px-4 text-left font-medium">Tanggal</th>
            <th className="py-3 px-4 text-left font-medium">Pelapor</th>
            <th className="py-3 px-4 text-left font-medium">Organik (kg)</th>
            <th className="py-3 px-4 text-left font-medium">Anorganik (kg)</th>
            <th className="py-3 px-4 text-left font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {schoolData.map(d => (
            <tr key={d.id} className="border-b hover:bg-muted/30">
              <td className="py-3 px-4">{d.tanggal}</td>
              <td className="py-3 px-4">{d.pelapor}</td>
              <td className="py-3 px-4">{d.organik}</td>
              <td className="py-3 px-4">{d.anorganik}</td>
              <td className="py-3 px-4"><StatusBadge status="selesai" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RiwayatSampahPage;
