import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import NutritionBadge from '@/components/NutritionBadge';
import { menuHarianList, getSekolahName, getSppgName, sekolahList } from '@/data/mockData';
import { MenuHarian } from '@/types';
import { Search } from 'lucide-react';

const MenuSekolahPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<MenuHarian | null>(null);

  const filtered = menuHarianList.filter(m => {
    const name = getSekolahName(m.sekolahId).toLowerCase();
    return name.includes(search.toLowerCase());
  });

  const getTotals = (m: MenuHarian) => {
    return m.items.reduce((acc, item) => ({
      kalori: acc.kalori + item.kalori,
      protein: acc.protein + item.protein,
      karbohidrat: acc.karbohidrat + item.karbohidrat,
      lemak: acc.lemak + item.lemak,
      harga: acc.harga + item.harga,
    }), { kalori: 0, protein: 0, karbohidrat: 0, lemak: 0, harga: 0 });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="font-heading text-3xl font-bold mb-2">Menu Sekolah</h1>
      <p className="text-muted-foreground mb-6">Lihat menu bergizi yang disajikan di sekolah-sekolah penerima MBG</p>

      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Cari nama sekolah..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(menu => {
          const totals = getTotals(menu);
          return (
            <div key={menu.id} className="bg-card rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-semibold text-sm">{getSekolahName(menu.sekolahId)}</h3>
                <span className="text-xs text-muted-foreground">{menu.tanggal}</span>
              </div>
              <div className="space-y-1.5 mb-4">
                {menu.items.map(item => (
                  <p key={item.id} className="text-sm text-foreground">• {item.nama} ({item.porsi})</p>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <NutritionBadge label="Kalori" value={totals.kalori} unit="kcal" variant="kalori" />
                <NutritionBadge label="Protein" value={totals.protein} variant="protein" />
                <NutritionBadge label="Karbo" value={totals.karbohidrat} variant="karbo" />
                <NutritionBadge label="Lemak" value={totals.lemak} variant="lemak" />
              </div>
              <Button variant="outline" size="sm" className="w-full rounded-lg" onClick={() => setSelected(menu)}>
                Lihat Detail
              </Button>
            </div>
          );
        })}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading">{selected && getSekolahName(selected.sekolahId)} — {selected?.tanggal}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">SPPG: {getSppgName(selected.sppgId)}</p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2">Menu</th><th>Kalori</th><th>Protein</th><th>Karbo</th><th>Lemak</th><th>Harga</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.items.map(item => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2">{item.nama}</td>
                      <td>{item.kalori}</td><td>{item.protein}g</td><td>{item.karbohidrat}g</td><td>{item.lemak}g</td>
                      <td>Rp{item.harga.toLocaleString('id-ID')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-muted rounded-lg p-3 text-sm">
                <strong>Total:</strong> {getTotals(selected).kalori} kcal | Rp{getTotals(selected).harga.toLocaleString('id-ID')}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuSekolahPage;
