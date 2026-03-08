import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageUpload from '@/components/ImageUpload';
import StatusBadge from '@/components/StatusBadge';
import { sekolahList, laporanList } from '@/data/mockData';
import { toast } from 'sonner';
import { Loader2, CheckCircle2 } from 'lucide-react';

const LaporanPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [tiketNomor, setTiketNomor] = useState('');
  const [cekTiket, setCekTiket] = useState('');
  const [foundLaporan, setFoundLaporan] = useState<typeof laporanList[0] | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    const nomor = `TK-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${String(Math.floor(Math.random()*999)).padStart(3,'0')}`;
    setTiketNomor(nomor);
    setSubmitted(true);
    setLoading(false);
    toast.success('Laporan berhasil dikirim!');
  };

  const handleCekStatus = () => {
    const found = laporanList.find(l => l.tiketNomor === cekTiket || l.pelapor.toLowerCase().includes(cekTiket.toLowerCase()));
    setFoundLaporan(found || null);
    if (!found) toast.error('Laporan tidak ditemukan');
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <h1 className="font-heading text-3xl font-bold mb-2">Laporan Warga</h1>
      <p className="text-muted-foreground mb-8">Sampaikan keluhan atau laporan terkait program MBG</p>

      <Tabs defaultValue="buat">
        <TabsList className="w-full rounded-lg">
          <TabsTrigger value="buat" className="flex-1 rounded-lg">Buat Laporan</TabsTrigger>
          <TabsTrigger value="cek" className="flex-1 rounded-lg">Cek Status</TabsTrigger>
        </TabsList>

        <TabsContent value="buat" className="mt-6">
          {submitted ? (
            <div className="bg-card rounded-lg shadow-card p-8 text-center">
              <CheckCircle2 className="h-16 w-16 text-accent mx-auto mb-4" />
              <h2 className="font-heading text-xl font-bold mb-2">Laporan Terkirim!</h2>
              <p className="text-muted-foreground mb-4">Nomor tiket Anda:</p>
              <p className="text-2xl font-heading font-bold text-primary">{tiketNomor}</p>
              <p className="text-sm text-muted-foreground mt-4">Simpan nomor ini untuk mengecek status laporan</p>
              <Button className="mt-6 rounded-lg" onClick={() => setSubmitted(false)}>Buat Laporan Baru</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-card p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label>Nama Pelapor</Label><Input placeholder="Nama lengkap" className="mt-1.5 rounded-lg" required /></div>
                <div><Label>Nomor HP</Label><Input placeholder="08xxxxxxxxxx" className="mt-1.5 rounded-lg" required /></div>
              </div>
              <div>
                <Label>Pilih Sekolah</Label>
                <Select required>
                  <SelectTrigger className="mt-1.5 rounded-lg"><SelectValue placeholder="Pilih sekolah" /></SelectTrigger>
                  <SelectContent>
                    {sekolahList.map(s => <SelectItem key={s.id} value={s.id}>{s.nama}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Jenis Laporan</Label>
                <Select required>
                  <SelectTrigger className="mt-1.5 rounded-lg"><SelectValue placeholder="Pilih jenis" /></SelectTrigger>
                  <SelectContent>
                    {['Makanan basi', 'Porsi kurang', 'Keracunan', 'Benda asing', 'Lainnya'].map(j => (
                      <SelectItem key={j} value={j}>{j}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Deskripsi Masalah</Label>
                <Textarea placeholder="Jelaskan masalah secara detail (min 50 karakter)" className="mt-1.5 rounded-lg" minLength={50} required />
              </div>
              <div>
                <Label>Lokasi</Label>
                <Input placeholder="Alamat lokasi kejadian" className="mt-1.5 rounded-lg" />
              </div>
              <ImageUpload onImageSelect={() => {}} multiple label="Upload Bukti Foto" />
              <Button type="submit" className="w-full rounded-lg" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Kirim Laporan
              </Button>
            </form>
          )}
        </TabsContent>

        <TabsContent value="cek" className="mt-6">
          <div className="bg-card rounded-lg shadow-card p-6 space-y-4">
            <div>
              <Label>Nomor Tiket atau Nama</Label>
              <div className="flex gap-2 mt-1.5">
                <Input placeholder="TK-20260308-001" value={cekTiket} onChange={e => setCekTiket(e.target.value)} className="rounded-lg" />
                <Button onClick={handleCekStatus} className="rounded-lg">Cek</Button>
              </div>
            </div>
            {foundLaporan && (
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-semibold">{foundLaporan.tiketNomor}</span>
                  <StatusBadge status={foundLaporan.status} />
                </div>
                <p className="text-sm"><strong>Jenis:</strong> {foundLaporan.jenisLaporan}</p>
                <p className="text-sm"><strong>Tanggal:</strong> {foundLaporan.tanggal}</p>
                <p className="text-sm"><strong>Pelapor:</strong> {foundLaporan.pelapor}</p>
                {foundLaporan.catatanAdmin && (
                  <div className="bg-accent/10 rounded-lg p-3 text-sm">
                    <strong>Respon Admin:</strong> {foundLaporan.catatanAdmin}
                  </div>
                )}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LaporanPage;
