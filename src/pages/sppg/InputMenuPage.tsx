import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sekolahList } from '@/data/mockData';
import { toast } from 'sonner';
import { PlusCircle, Trash2, Loader2 } from 'lucide-react';

interface FoodItem {
  nama: string; porsi: string; kalori: number; protein: number; karbohidrat: number; lemak: number; harga: number;
}

const empty: FoodItem = { nama: '', porsi: '', kalori: 0, protein: 0, karbohidrat: 0, lemak: 0, harga: 0 };

const InputMenuPage: React.FC = () => {
  const [items, setItems] = useState<FoodItem[]>([{ ...empty }]);
  const [loading, setLoading] = useState(false);

  const updateItem = (idx: number, field: keyof FoodItem, value: string | number) => {
    setItems(prev => prev.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };

  const totals = items.reduce((acc, i) => ({
    kalori: acc.kalori + (i.kalori || 0), protein: acc.protein + (i.protein || 0),
    karbohidrat: acc.karbohidrat + (i.karbohidrat || 0), lemak: acc.lemak + (i.lemak || 0), harga: acc.harga + (i.harga || 0),
  }), { kalori: 0, protein: 0, karbohidrat: 0, lemak: 0, harga: 0 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success('Menu berhasil disimpan!');
    setItems([{ ...empty }]);
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <h2 className="font-heading text-2xl font-bold">Input Menu Hari Ini</h2>

      <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-card p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Tanggal</Label>
            <Input type="date" defaultValue="2026-03-08" className="mt-1.5 rounded-lg" />
          </div>
          <div>
            <Label>Nama Sekolah</Label>
            <Select>
              <SelectTrigger className="mt-1.5 rounded-lg"><SelectValue placeholder="Pilih sekolah" /></SelectTrigger>
              <SelectContent>
                {sekolahList.filter(s => s.sppgId === 'sp1').map(s => (
                  <SelectItem key={s.id} value={s.id}>{s.nama}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-base font-heading">Daftar Makanan</Label>
          <div className="space-y-4 mt-3">
            {items.map((item, idx) => (
              <div key={idx} className="bg-muted rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Item {idx + 1}</span>
                  {items.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => setItems(prev => prev.filter((_, i) => i !== idx))}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="col-span-2 sm:col-span-1">
                    <Label className="text-xs">Nama</Label>
                    <Input value={item.nama} onChange={e => updateItem(idx, 'nama', e.target.value)} placeholder="Nasi Putih" className="mt-1 rounded-lg" />
                  </div>
                  <div>
                    <Label className="text-xs">Porsi</Label>
                    <Input value={item.porsi} onChange={e => updateItem(idx, 'porsi', e.target.value)} placeholder="200g" className="mt-1 rounded-lg" />
                  </div>
                  <div>
                    <Label className="text-xs">Kalori</Label>
                    <Input type="number" value={item.kalori || ''} onChange={e => updateItem(idx, 'kalori', +e.target.value)} className="mt-1 rounded-lg" />
                  </div>
                  <div>
                    <Label className="text-xs">Protein (g)</Label>
                    <Input type="number" value={item.protein || ''} onChange={e => updateItem(idx, 'protein', +e.target.value)} className="mt-1 rounded-lg" />
                  </div>
                  <div>
                    <Label className="text-xs">Karbo (g)</Label>
                    <Input type="number" value={item.karbohidrat || ''} onChange={e => updateItem(idx, 'karbohidrat', +e.target.value)} className="mt-1 rounded-lg" />
                  </div>
                  <div>
                    <Label className="text-xs">Lemak (g)</Label>
                    <Input type="number" value={item.lemak || ''} onChange={e => updateItem(idx, 'lemak', +e.target.value)} className="mt-1 rounded-lg" />
                  </div>
                  <div>
                    <Label className="text-xs">Harga (Rp)</Label>
                    <Input type="number" value={item.harga || ''} onChange={e => updateItem(idx, 'harga', +e.target.value)} className="mt-1 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" className="mt-3 rounded-lg" onClick={() => setItems(prev => [...prev, { ...empty }])}>
            <PlusCircle className="h-4 w-4 mr-2" /> Tambah Item Makanan
          </Button>
        </div>

        <div className="bg-primary/5 rounded-lg p-4 text-sm">
          <strong>Total:</strong> {totals.kalori} kcal | Protein {totals.protein}g | Karbo {totals.karbohidrat}g | Lemak {totals.lemak}g | Rp{totals.harga.toLocaleString('id-ID')}
        </div>

        <Button type="submit" className="w-full rounded-lg" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          Simpan Menu
        </Button>
      </form>
    </div>
  );
};

export default InputMenuPage;
