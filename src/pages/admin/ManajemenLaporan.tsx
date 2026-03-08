import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import StatusBadge from '@/components/StatusBadge';
import { laporanList, getSekolahName } from '@/data/mockData';
import { LaporanWarga } from '@/types';
import { Search, Eye } from 'lucide-react';
import { toast } from 'sonner';

const ManajemenLaporan: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selected, setSelected] = useState<LaporanWarga | null>(null);
  const [data, setData] = useState(laporanList);

  const filtered = data.filter(l => {
    const matchSearch = l.pelapor.toLowerCase().includes(search.toLowerCase()) || l.tiketNomor.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || l.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, status: 'belum' | 'proses' | 'selesai') => {
    setData(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    toast.success('Status berhasil diperbarui');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="font-heading text-2xl font-bold">Manajemen Laporan</h2>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Cari pelapor atau tiket..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 rounded-lg" />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48 rounded-lg"><SelectValue placeholder="Filter Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="belum">Belum Ditangani</SelectItem>
            <SelectItem value="proses">Dalam Proses</SelectItem>
            <SelectItem value="selesai">Sudah Ditangani</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-lg shadow-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="py-3 px-4 text-left font-medium">Tiket</th>
              <th className="py-3 px-4 text-left font-medium">Pelapor</th>
              <th className="py-3 px-4 text-left font-medium">Sekolah</th>
              <th className="py-3 px-4 text-left font-medium">Jenis</th>
              <th className="py-3 px-4 text-left font-medium">Tanggal</th>
              <th className="py-3 px-4 text-left font-medium">Status</th>
              <th className="py-3 px-4 text-left font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id} className="border-b hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4 font-mono text-xs">{l.tiketNomor}</td>
                <td className="py-3 px-4">{l.pelapor}</td>
                <td className="py-3 px-4">{getSekolahName(l.sekolahId)}</td>
                <td className="py-3 px-4">{l.jenisLaporan}</td>
                <td className="py-3 px-4">{l.tanggal}</td>
                <td className="py-3 px-4"><StatusBadge status={l.status} /></td>
                <td className="py-3 px-4">
                  <Button variant="ghost" size="sm" onClick={() => setSelected(l)}>
                    <Eye className="h-4 w-4 mr-1" /> Detail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle className="font-heading">Detail Laporan</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-mono text-sm">{selected.tiketNomor}</span>
                <StatusBadge status={selected.status} />
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Pelapor:</span> {selected.pelapor}</div>
                <div><span className="text-muted-foreground">HP:</span> {selected.nomorHp}</div>
                <div><span className="text-muted-foreground">Sekolah:</span> {getSekolahName(selected.sekolahId)}</div>
                <div><span className="text-muted-foreground">Tanggal:</span> {selected.tanggal}</div>
              </div>
              <div className="text-sm"><span className="text-muted-foreground">Jenis:</span> {selected.jenisLaporan}</div>
              <div className="bg-muted rounded-lg p-3 text-sm">{selected.deskripsi}</div>
              {selected.catatanAdmin && (
                <div className="bg-accent/10 rounded-lg p-3 text-sm">
                  <strong>Catatan Admin:</strong> {selected.catatanAdmin}
                </div>
              )}
              <div>
                <label className="text-sm font-medium">Update Status:</label>
                <div className="flex gap-2 mt-2">
                  {(['belum', 'proses', 'selesai'] as const).map(s => (
                    <Button key={s} size="sm" variant={selected.status === s ? 'default' : 'outline'} className="rounded-lg text-xs"
                      onClick={() => { updateStatus(selected.id, s); setSelected({ ...selected, status: s }); }}>
                      {s === 'belum' ? 'Belum' : s === 'proses' ? 'Proses' : 'Selesai'}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManajemenLaporan;
