import React, { useState } from 'react';
import { menuHarianList, getSekolahName } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { List, CalendarDays } from 'lucide-react';

const RiwayatMenuPage: React.FC = () => {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const sppgMenus = menuHarianList.filter(m => m.sppgId === 'sp1');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold">Riwayat Menu</h2>
        <div className="flex gap-1">
          <Button variant={view === 'list' ? 'default' : 'outline'} size="sm" className="rounded-lg" onClick={() => setView('list')}>
            <List className="h-4 w-4 mr-1" /> List
          </Button>
          <Button variant={view === 'calendar' ? 'default' : 'outline'} size="sm" className="rounded-lg" onClick={() => setView('calendar')}>
            <CalendarDays className="h-4 w-4 mr-1" /> Calendar
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {sppgMenus.map(menu => {
          const totals = menu.items.reduce((a, i) => ({
            kalori: a.kalori + i.kalori, harga: a.harga + i.harga,
          }), { kalori: 0, harga: 0 });

          return (
            <div key={menu.id} className="bg-card rounded-lg shadow-card p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-heading font-semibold">{menu.tanggal}</h3>
                  <p className="text-sm text-muted-foreground">{getSekolahName(menu.sekolahId)}</p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold text-primary">{totals.kalori} kcal</p>
                  <p className="text-muted-foreground">Rp{totals.harga.toLocaleString('id-ID')}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {menu.items.map(item => (
                  <span key={item.id} className="bg-muted px-2.5 py-1 rounded-md text-xs">{item.nama}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RiwayatMenuPage;
