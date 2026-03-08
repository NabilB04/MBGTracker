import React from 'react';
import { menuHarianList } from '@/data/mockData';
import NutritionBadge from '@/components/NutritionBadge';

const todayMenu = menuHarianList.find(m => m.tanggal === '2026-03-08' && m.sekolahId === 's1');

const MenuHariIniPage: React.FC = () => (
  <div className="space-y-6 animate-fade-in">
    <h2 className="font-heading text-2xl font-bold">Menu Hari Ini</h2>

    {todayMenu ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {todayMenu.items.map(item => (
          <div key={item.id} className="bg-card rounded-lg shadow-card p-5 hover:shadow-card-hover transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl mb-3">
              {item.nama.includes('Nasi') ? '🍚' : item.nama.includes('Ayam') ? '🍗' : item.nama.includes('Sayur') || item.nama.includes('Bayam') ? '🥬' : item.nama.includes('Buah') || item.nama.includes('Pisang') ? '🍌' : item.nama.includes('Susu') ? '🥛' : '🍽️'}
            </div>
            <h3 className="font-heading font-semibold mb-1">{item.nama}</h3>
            <p className="text-sm text-muted-foreground mb-3">{item.porsi}</p>
            <div className="flex flex-wrap gap-1.5">
              <NutritionBadge label="Kal" value={item.kalori} unit="kcal" variant="kalori" />
              <NutritionBadge label="Pro" value={item.protein} variant="protein" />
              <NutritionBadge label="Kar" value={item.karbohidrat} variant="karbo" />
              <NutritionBadge label="Lem" value={item.lemak} variant="lemak" />
            </div>
            <p className="text-sm text-primary font-medium mt-3">Rp{item.harga.toLocaleString('id-ID')}</p>
          </div>
        ))}
      </div>
    ) : (
      <div className="bg-card rounded-lg shadow-card p-8 text-center">
        <span className="text-5xl block mb-3">📭</span>
        <p className="text-muted-foreground">Belum ada menu untuk hari ini</p>
      </div>
    )}
  </div>
);

export default MenuHariIniPage;
