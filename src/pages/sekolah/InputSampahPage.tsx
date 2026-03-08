import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageUpload from '@/components/ImageUpload';
import { toast } from 'sonner';
import { Loader2, CheckCircle2 } from 'lucide-react';

const InputSampahPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitted(true);
    setLoading(false);
    toast.success('Laporan sisa makanan berhasil dikirim!');
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-12 animate-fade-in">
        <CheckCircle2 className="h-16 w-16 text-accent mx-auto mb-4" />
        <h2 className="font-heading text-xl font-bold mb-2">Laporan Terkirim!</h2>
        <p className="text-muted-foreground mb-6">Data sisa makanan berhasil dilaporkan</p>
        <Button className="rounded-lg" onClick={() => setSubmitted(false)}>Buat Laporan Baru</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <h2 className="font-heading text-2xl font-bold">Input Sisa Makanan</h2>

      <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-card p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>Tanggal</Label><Input type="date" defaultValue="2026-03-08" className="mt-1.5 rounded-lg" /></div>
          <div><Label>Nama Pelapor</Label><Input placeholder="Nama guru/staf" className="mt-1.5 rounded-lg" required /></div>
        </div>
        <div>
          <Label>Kelas/Jenjang</Label>
          <Select>
            <SelectTrigger className="mt-1.5 rounded-lg"><SelectValue placeholder="Pilih kelas" /></SelectTrigger>
            <SelectContent>
              {['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'].map(k => (
                <SelectItem key={k} value={k}>{k}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div><Label>Sisa Organik (kg)</Label><Input type="number" step="0.1" placeholder="0.0" className="mt-1.5 rounded-lg" required /></div>
          <div><Label>Sisa Anorganik (kg)</Label><Input type="number" step="0.1" placeholder="0.0" className="mt-1.5 rounded-lg" required /></div>
          <div><Label>Jumlah Ompreng Sisa</Label><Input type="number" placeholder="0" className="mt-1.5 rounded-lg" /></div>
        </div>
        <ImageUpload onImageSelect={() => {}} label="Upload Foto Ompreng" />
        <div><Label>Catatan Tambahan</Label><Textarea placeholder="Catatan opsional..." className="mt-1.5 rounded-lg" /></div>
        <Button type="submit" className="w-full rounded-lg" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          Kirim Laporan Sisa
        </Button>
      </form>
    </div>
  );
};

export default InputSampahPage;
