import React from 'react';
import { sppgList } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/StatusBadge';

const DataSPPGPage: React.FC = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="flex items-center justify-between">
      <h2 className="font-heading text-2xl font-bold">Data SPPG</h2>
      <Button className="rounded-lg">+ Tambah SPPG</Button>
    </div>
    <div className="bg-card rounded-lg shadow-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="py-3 px-4 text-left font-medium">Nama SPPG</th>
            <th className="py-3 px-4 text-left font-medium">Alamat</th>
            <th className="py-3 px-4 text-left font-medium">Sekolah Binaan</th>
            <th className="py-3 px-4 text-left font-medium">Kontak</th>
            <th className="py-3 px-4 text-left font-medium">Status</th>
            <th className="py-3 px-4 text-left font-medium">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {sppgList.map(s => (
            <tr key={s.id} className="border-b hover:bg-muted/30">
              <td className="py-3 px-4 font-medium">{s.nama}</td>
              <td className="py-3 px-4">{s.alamat}</td>
              <td className="py-3 px-4">{s.jumlahSekolahBinaan}</td>
              <td className="py-3 px-4">{s.kontak}</td>
              <td className="py-3 px-4">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.statusAktif ? 'bg-accent/10 text-accent' : 'bg-destructive/10 text-destructive'}`}>
                  {s.statusAktif ? 'Aktif' : 'Nonaktif'}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm" className="text-destructive">Hapus</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default DataSPPGPage;
