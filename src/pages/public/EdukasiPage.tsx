import React from 'react';
import { artikelList } from '@/data/mockData';
import { BookOpen, Apple, Beef, Salad, Ban } from 'lucide-react';

const tips = [
  { icon: '🌅', title: 'Sarapan Bergizi', desc: 'Awali hari dengan sarapan yang mengandung karbohidrat kompleks, protein, dan serat untuk energi tahan lama.' },
  { icon: '🍗', title: 'Protein untuk Tumbuh', desc: 'Anak membutuhkan protein dari telur, ikan, ayam, dan tempe untuk mendukung pertumbuhan otot dan otak.' },
  { icon: '🥦', title: 'Buah & Sayur', desc: 'Konsumsi 5 porsi buah dan sayur setiap hari untuk memenuhi kebutuhan vitamin dan mineral anak.' },
  { icon: '🚫', title: 'Hindari Junk Food', desc: 'Kurangi makanan tinggi gula, garam, dan lemak trans yang dapat mengganggu konsentrasi belajar anak.' },
];

const EdukasiPage: React.FC = () => (
  <div className="container mx-auto px-4 py-10">
    <h1 className="font-heading text-3xl font-bold mb-2">Edukasi Gizi</h1>
    <p className="text-muted-foreground mb-8">Artikel dan tips seputar gizi anak sekolah</p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {artikelList.map(artikel => (
        <div key={artikel.id} className="bg-card rounded-lg shadow-card hover:shadow-card-hover transition-shadow overflow-hidden">
          <div className="h-40 bg-muted flex items-center justify-center text-5xl">{artikel.thumbnail}</div>
          <div className="p-5">
            <p className="text-xs text-muted-foreground mb-1">{artikel.tanggal} · {artikel.penulis}</p>
            <h3 className="font-heading font-semibold mb-2">{artikel.judul}</h3>
            <p className="text-sm text-muted-foreground mb-3">{artikel.deskripsi}</p>
            <button className="text-sm text-primary font-medium hover:underline">Baca Selengkapnya →</button>
          </div>
        </div>
      ))}
    </div>

    <h2 className="font-heading text-2xl font-bold mb-6">Tips Gizi Harian</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {tips.map((tip, i) => (
        <div key={i} className="bg-card rounded-lg shadow-card p-5 text-center hover:shadow-card-hover transition-shadow">
          <span className="text-4xl block mb-3">{tip.icon}</span>
          <h3 className="font-heading font-semibold mb-2">{tip.title}</h3>
          <p className="text-sm text-muted-foreground">{tip.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default EdukasiPage;
