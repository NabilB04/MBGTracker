import React, { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';

const mockResult = {
  items: [
    { nama: 'Nasi Putih', confidence: 95 },
    { nama: 'Ayam Goreng', confidence: 88 },
    { nama: 'Sayur Bayam', confidence: 82 },
    { nama: 'Tempe Goreng', confidence: 76 },
  ],
  nutrition: { kalori: 650, protein: 28, karbohidrat: 82, lemak: 22, serat: 8 },
  akgPercentages: { kalori: 78, protein: 85, karbohidrat: 72, lemak: 65, serat: 55 },
  memenuhi: true,
};

const AIScannerPage: React.FC = () => {
  const [hasImage, setHasImage] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof mockResult | null>(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    await new Promise(r => setTimeout(r, 2500));
    setResult(mockResult);
    setAnalyzing(false);
  };

  const scanHistory = [
    { date: '7 Mar 2026', result: 'Nasi + Ayam + Sayur — 720 kcal ✅' },
    { date: '6 Mar 2026', result: 'Nasi + Tempe + Tahu — 580 kcal ⚠️' },
    { date: '5 Mar 2026', result: 'Nasi + Ikan + Kangkung — 690 kcal ✅' },
  ];

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <div className="text-center mb-8">
        <span className="text-5xl block mb-3">🤖</span>
        <h1 className="font-heading text-3xl font-bold">AI Nutrition Scanner</h1>
        <p className="text-muted-foreground mt-2">Scan nutrisi makanan MBG dengan kecerdasan buatan</p>
      </div>

      <div className="bg-card rounded-lg shadow-card p-6 mb-6">
        {!result ? (
          <div className="space-y-6">
            <ImageUpload onImageSelect={() => setHasImage(true)} label="Step 1 — Upload Foto Makanan" />

            {analyzing ? (
              <div className="text-center py-8">
                <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-3" />
                <p className="font-heading font-semibold">AI sedang menganalisis...</p>
                <div className="space-y-2 mt-4 max-w-xs mx-auto">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-4 bg-muted rounded animate-pulse" style={{ width: `${100 - i * 20}%` }} />
                  ))}
                </div>
              </div>
            ) : (
              <Button onClick={handleAnalyze} disabled={!hasImage} className="w-full rounded-lg" size="lg">
                Analisis Sekarang
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              {result.memenuhi ? (
                <span className="flex items-center gap-2 bg-accent/10 text-accent px-3 py-1.5 rounded-full text-sm font-semibold">
                  <CheckCircle2 className="h-4 w-4" /> Memenuhi Standar Gizi
                </span>
              ) : (
                <span className="flex items-center gap-2 bg-warning/10 text-warning-foreground px-3 py-1.5 rounded-full text-sm font-semibold">
                  <AlertTriangle className="h-4 w-4" /> Perlu Perbaikan
                </span>
              )}
            </div>

            <div>
              <h3 className="font-heading font-semibold mb-3">Makanan Terdeteksi</h3>
              <div className="space-y-2">
                {result.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-muted rounded-lg px-4 py-2">
                    <span className="text-sm font-medium">{item.nama}</span>
                    <span className="text-xs text-muted-foreground">{item.confidence}% confidence</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading font-semibold mb-3">Breakdown Nutrisi</h3>
              <table className="w-full text-sm">
                <thead><tr className="border-b"><th className="py-2 text-left">Nutrisi</th><th className="text-right">Jumlah</th><th className="text-right">% AKG</th></tr></thead>
                <tbody>
                  {Object.entries(result.nutrition).map(([key, val]) => (
                    <tr key={key} className="border-b">
                      <td className="py-2 capitalize">{key}</td>
                      <td className="text-right">{val}{key === 'kalori' ? ' kcal' : 'g'}</td>
                      <td className="text-right">{(result.akgPercentages as any)[key]}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="font-heading font-semibold mb-3">vs Standar AKG Anak Sekolah</h3>
              {Object.entries(result.akgPercentages).map(([key, val]) => (
                <div key={key} className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="capitalize">{key}</span><span>{val}%</span>
                  </div>
                  <Progress value={val} className="h-2" />
                </div>
              ))}
            </div>

            <Button variant="outline" className="rounded-lg" onClick={() => { setResult(null); setHasImage(false); }}>
              Scan Lagi
            </Button>
          </div>
        )}
      </div>

      <div className="bg-card rounded-lg shadow-card p-5">
        <h3 className="font-heading font-semibold mb-3">Riwayat Scan</h3>
        <div className="space-y-2">
          {scanHistory.map((h, i) => (
            <div key={i} className="flex items-center justify-between bg-muted rounded-lg px-4 py-2.5 text-sm">
              <span className="text-muted-foreground">{h.date}</span>
              <span>{h.result}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIScannerPage;
