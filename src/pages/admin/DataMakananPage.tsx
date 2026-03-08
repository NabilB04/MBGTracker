import React from 'react';
import { menuHarianList, getSekolahName, getSppgName } from '@/data/mockData';
import { Button } from '@/components/ui/button';

const DataMakananPage: React.FC = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="flex items-center justify-between">
      <h2 className="font-heading text-2xl font-bold">Data Makanan</h2>
      <Button variant="outline" className="rounded-lg">📥 Export</Button>
    </div>
    <div className="bg-card rounded-lg shadow-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="py-3 px-4 text-left font-medium">Nama Menu</th>
            <th className="py-3 px-4 text-left font-medium">Tanggal</th>
            <th className="py-3 px-4 text-left font-medium">SPPG</th>
            <th className="py-3 px-4 text-left font-medium">Kalori</th>
            <th className="py-3 px-4 text-left font-medium">Protein</th>
            <th className="py-3 px-4 text-left font-medium">Karbo</th>
            <th className="py-3 px-4 text-left font-medium">Lemak</th>
            <th className="py-3 px-4 text-left font-medium">Harga</th>
          </tr>
        </thead>
        <tbody>
          {menuHarianList.flatMap(m =>
            m.items.map(item => (
              <tr key={item.id} className="border-b hover:bg-muted/30">
                <td className="py-3 px-4">{item.nama}</td>
                <td className="py-3 px-4">{m.tanggal}</td>
                <td className="py-3 px-4">{getSppgName(m.sppgId)}</td>
                <td className="py-3 px-4">{item.kalori}</td>
                <td className="py-3 px-4">{item.protein}g</td>
                <td className="py-3 px-4">{item.karbohidrat}g</td>
                <td className="py-3 px-4">{item.lemak}g</td>
                <td className="py-3 px-4">Rp{item.harga.toLocaleString('id-ID')}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default DataMakananPage;
