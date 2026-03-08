import { Sekolah, SPPG, MenuHarian, LaporanWarga, DataSampah, ArtikelEdukasi, MonitoringKasus } from '@/types';

export const sekolahList: Sekolah[] = [
  { id: 's1', nama: 'SDN Ciputat 1', alamat: 'Jl. Ciputat Raya No. 12, Tangerang Selatan', sppgId: 'sp1', jumlahSiswa: 320 },
  { id: 's2', nama: 'SDN Menteng 2', alamat: 'Jl. Menteng Atas No. 5, Jakarta Pusat', sppgId: 'sp2', jumlahSiswa: 285 },
  { id: 's3', nama: 'SDN Cibubur 3', alamat: 'Jl. Cibubur Indah No. 8, Jakarta Timur', sppgId: 'sp3', jumlahSiswa: 410 },
  { id: 's4', nama: 'MI Al-Hidayah', alamat: 'Jl. Al-Hidayah No. 15, Depok', sppgId: 'sp1', jumlahSiswa: 195 },
  { id: 's5', nama: 'SDN Tangerang 5', alamat: 'Jl. Tangerang Kota No. 22, Tangerang', sppgId: 'sp2', jumlahSiswa: 350 },
];

export const sppgList: SPPG[] = [
  { id: 'sp1', nama: 'SPPG Ciputat', alamat: 'Jl. Ciputat Raya No. 50', jumlahSekolahBinaan: 2, kontak: '081234567890', statusAktif: true },
  { id: 'sp2', nama: 'SPPG Menteng', alamat: 'Jl. Menteng No. 30', jumlahSekolahBinaan: 2, kontak: '081298765432', statusAktif: true },
  { id: 'sp3', nama: 'SPPG Cibubur', alamat: 'Jl. Cibubur No. 18', jumlahSekolahBinaan: 1, kontak: '081345678901', statusAktif: true },
];

export const menuHarianList: MenuHarian[] = [
  {
    id: 'm1', tanggal: '2026-03-08', sekolahId: 's1', sppgId: 'sp1',
    items: [
      { id: 'mi1', nama: 'Nasi Putih', porsi: '200g', kalori: 260, protein: 5, karbohidrat: 56, lemak: 1, harga: 2000 },
      { id: 'mi2', nama: 'Ayam Goreng', porsi: '100g', kalori: 280, protein: 26, karbohidrat: 8, lemak: 16, harga: 8000 },
      { id: 'mi3', nama: 'Sayur Bayam', porsi: '100g', kalori: 23, protein: 3, karbohidrat: 4, lemak: 0.3, harga: 2000 },
      { id: 'mi4', nama: 'Buah Pisang', porsi: '1 buah', kalori: 105, protein: 1.3, karbohidrat: 27, lemak: 0.4, harga: 1500 },
      { id: 'mi5', nama: 'Susu UHT', porsi: '200ml', kalori: 120, protein: 6, karbohidrat: 12, lemak: 5, harga: 3500 },
    ],
  },
  {
    id: 'm2', tanggal: '2026-03-07', sekolahId: 's2', sppgId: 'sp2',
    items: [
      { id: 'mi6', nama: 'Nasi Putih', porsi: '200g', kalori: 260, protein: 5, karbohidrat: 56, lemak: 1, harga: 2000 },
      { id: 'mi7', nama: 'Tempe Orek', porsi: '80g', kalori: 160, protein: 12, karbohidrat: 8, lemak: 10, harga: 3000 },
      { id: 'mi8', nama: 'Sayur Sop', porsi: '150g', kalori: 45, protein: 2, karbohidrat: 8, lemak: 1, harga: 3000 },
      { id: 'mi9', nama: 'Buah Jeruk', porsi: '1 buah', kalori: 62, protein: 1.2, karbohidrat: 15, lemak: 0.2, harga: 2000 },
    ],
  },
  {
    id: 'm3', tanggal: '2026-03-08', sekolahId: 's3', sppgId: 'sp3',
    items: [
      { id: 'mi10', nama: 'Nasi Putih', porsi: '200g', kalori: 260, protein: 5, karbohidrat: 56, lemak: 1, harga: 2000 },
      { id: 'mi11', nama: 'Ikan Goreng', porsi: '100g', kalori: 200, protein: 22, karbohidrat: 5, lemak: 10, harga: 7000 },
      { id: 'mi12', nama: 'Tumis Kangkung', porsi: '100g', kalori: 40, protein: 3, karbohidrat: 5, lemak: 2, harga: 2500 },
      { id: 'mi13', nama: 'Susu UHT', porsi: '200ml', kalori: 120, protein: 6, karbohidrat: 12, lemak: 5, harga: 3500 },
    ],
  },
  {
    id: 'm4', tanggal: '2026-03-06', sekolahId: 's1', sppgId: 'sp1',
    items: [
      { id: 'mi14', nama: 'Nasi Putih', porsi: '200g', kalori: 260, protein: 5, karbohidrat: 56, lemak: 1, harga: 2000 },
      { id: 'mi15', nama: 'Telur Dadar', porsi: '1 butir', kalori: 155, protein: 11, karbohidrat: 1, lemak: 12, harga: 3000 },
      { id: 'mi16', nama: 'Sayur Asem', porsi: '150g', kalori: 55, protein: 2, karbohidrat: 10, lemak: 1, harga: 2500 },
      { id: 'mi17', nama: 'Buah Pepaya', porsi: '100g', kalori: 43, protein: 0.5, karbohidrat: 11, lemak: 0.3, harga: 1500 },
    ],
  },
  {
    id: 'm5', tanggal: '2026-03-05', sekolahId: 's4', sppgId: 'sp1',
    items: [
      { id: 'mi18', nama: 'Nasi Putih', porsi: '200g', kalori: 260, protein: 5, karbohidrat: 56, lemak: 1, harga: 2000 },
      { id: 'mi19', nama: 'Rendang Daging', porsi: '80g', kalori: 195, protein: 18, karbohidrat: 3, lemak: 12, harga: 10000 },
      { id: 'mi20', nama: 'Sayur Lodeh', porsi: '120g', kalori: 80, protein: 3, karbohidrat: 8, lemak: 4, harga: 3000 },
      { id: 'mi21', nama: 'Buah Pisang', porsi: '1 buah', kalori: 105, protein: 1.3, karbohidrat: 27, lemak: 0.4, harga: 1500 },
    ],
  },
];

export const laporanList: LaporanWarga[] = [
  { id: 'l1', pelapor: 'Budi Santoso', nomorHp: '081234567890', sekolahId: 's1', jenisLaporan: 'Porsi kurang', deskripsi: 'Porsi nasi dan lauk yang diberikan sangat sedikit, tidak cukup untuk anak usia SD. Anak saya sering pulang dalam keadaan masih lapar.', tanggal: '2026-03-08', status: 'belum', tiketNomor: 'TK-20260308-001' },
  { id: 'l2', pelapor: 'Siti Aminah', nomorHp: '081298765432', sekolahId: 's2', jenisLaporan: 'Makanan basi', deskripsi: 'Anak saya menemukan sayur yang sudah berubah warna dan berbau tidak sedap. Beberapa siswa mengalami mual setelah makan.', tanggal: '2026-03-07', status: 'proses', tiketNomor: 'TK-20260307-002' },
  { id: 'l3', pelapor: 'Ahmad Ridwan', nomorHp: '081345678901', sekolahId: 's3', jenisLaporan: 'Benda asing', deskripsi: 'Ditemukan rambut di dalam sayur sop yang disajikan. Hal ini sangat mengganggu dan perlu diperbaiki standar kebersihannya.', tanggal: '2026-03-06', status: 'selesai', tiketNomor: 'TK-20260306-003', catatanAdmin: 'Sudah dilakukan inspeksi ke dapur SPPG dan diberikan peringatan.' },
  { id: 'l4', pelapor: 'Dewi Lestari', nomorHp: '081456789012', sekolahId: 's1', jenisLaporan: 'Keracunan', deskripsi: 'Tiga siswa kelas 4 mengalami sakit perut dan diare setelah makan siang. Diduga karena ayam goreng yang tidak matang sempurna.', tanggal: '2026-03-05', status: 'proses', tiketNomor: 'TK-20260305-004' },
  { id: 'l5', pelapor: 'Hendra Wijaya', nomorHp: '081567890123', sekolahId: 's4', jenisLaporan: 'Porsi kurang', deskripsi: 'Menu yang disajikan tidak sesuai dengan jadwal. Seharusnya ayam goreng tapi diganti tempe tanpa pemberitahuan.', tanggal: '2026-03-04', status: 'selesai', tiketNomor: 'TK-20260304-005', catatanAdmin: 'Menu telah disesuaikan kembali.' },
  { id: 'l6', pelapor: 'Rina Marlina', nomorHp: '081678901234', sekolahId: 's5', jenisLaporan: 'Lainnya', deskripsi: 'Tempat makan dan piring yang digunakan terlihat kotor dan tidak dicuci dengan baik. Perlu peningkatan standar kebersihan alat makan.', tanggal: '2026-03-03', status: 'belum', tiketNomor: 'TK-20260303-006' },
  { id: 'l7', pelapor: 'Joko Susanto', nomorHp: '081789012345', sekolahId: 's2', jenisLaporan: 'Makanan basi', deskripsi: 'Susu UHT yang disajikan sudah melewati tanggal kadaluarsa. Sangat berbahaya untuk anak-anak.', tanggal: '2026-03-02', status: 'selesai', tiketNomor: 'TK-20260302-007', catatanAdmin: 'Stok susu kadaluarsa sudah ditarik dan diganti.' },
  { id: 'l8', pelapor: 'Maya Putri', nomorHp: '081890123456', sekolahId: 's3', jenisLaporan: 'Porsi kurang', deskripsi: 'Anak saya hanya mendapat setengah porsi karena makanan habis sebelum semua siswa dilayani.', tanggal: '2026-03-01', status: 'proses', tiketNomor: 'TK-20260301-008' },
  { id: 'l9', pelapor: 'Agus Setiawan', nomorHp: '081901234567', sekolahId: 's5', jenisLaporan: 'Benda asing', deskripsi: 'Ditemukan potongan plastik dalam nasi. Sepertinya berasal dari kemasan beras yang tidak dibersihkan.', tanggal: '2026-02-28', status: 'belum', tiketNomor: 'TK-20260228-009' },
  { id: 'l10', pelapor: 'Lina Hartati', nomorHp: '081012345678', sekolahId: 's4', jenisLaporan: 'Keracunan', deskripsi: 'Lima siswa mengalami muntah-muntah setelah jam makan siang. Diduga kontaminasi pada sayur lodeh.', tanggal: '2026-02-27', status: 'selesai', tiketNomor: 'TK-20260227-010', catatanAdmin: 'Sampel makanan telah diuji lab, SPPG diberi sanksi.' },
];

export const dataSampahList: DataSampah[] = [];
const schools = ['s1', 's2', 's3', 's4', 's5'];
const reporters = ['Pak Guru Budi', 'Bu Sari', 'Pak Dedi', 'Bu Ani', 'Pak Rudi'];
for (let d = 0; d < 7; d++) {
  const date = new Date(2026, 2, 8 - d);
  const dateStr = date.toISOString().split('T')[0];
  schools.forEach((sId, idx) => {
    dataSampahList.push({
      id: `ds-${d}-${idx}`,
      sekolahId: sId,
      tanggal: dateStr,
      organik: parseFloat((Math.random() * 5 + 1).toFixed(1)),
      anorganik: parseFloat((Math.random() * 2 + 0.5).toFixed(1)),
      pelapor: reporters[idx],
      jumlahOmpreng: Math.floor(Math.random() * 10 + 2),
    });
  });
}

export const artikelList: ArtikelEdukasi[] = [
  {
    id: 'a1', judul: 'Pentingnya Sarapan Bergizi untuk Anak Sekolah', penulis: 'Dr. Ani Kurniawati',
    deskripsi: 'Sarapan yang bergizi membantu anak berkonsentrasi lebih baik di sekolah dan meningkatkan daya ingat mereka sepanjang hari.',
    konten: 'Sarapan merupakan waktu makan yang paling penting...',
    thumbnail: '🥣', tanggal: '2026-03-05',
  },
  {
    id: 'a2', judul: 'Protein: Bahan Bakar Pertumbuhan Anak', penulis: 'Prof. Budi Hartono',
    deskripsi: 'Protein berperan penting dalam pertumbuhan tulang, otot, dan otak anak. Ketahui sumber protein terbaik untuk menu sekolah.',
    konten: 'Protein adalah salah satu zat gizi makro yang sangat penting...',
    thumbnail: '🍗', tanggal: '2026-03-03',
  },
  {
    id: 'a3', judul: 'Panduan Mengurangi Sisa Makanan di Sekolah', penulis: 'Ir. Citra Dewi',
    deskripsi: 'Tips praktis untuk mengurangi food waste di lingkungan sekolah sehingga program MBG lebih efektif dan berkelanjutan.',
    konten: 'Sisa makanan di sekolah menjadi salah satu tantangan...',
    thumbnail: '♻️', tanggal: '2026-02-28',
  },
];

export const monitoringKasusList: MonitoringKasus[] = [
  { id: 'mk1', lokasi: 'Jakarta Pusat', lat: -6.1862, lng: 106.8340, jenisKasus: 'Keracunan makanan', status: 'aktif', tanggal: '2026-03-07', deskripsi: '5 siswa keracunan setelah makan siang' },
  { id: 'mk2', lokasi: 'Tangerang Selatan', lat: -6.3137, lng: 106.6456, jenisKasus: 'Makanan basi', status: 'investigasi', tanggal: '2026-03-06', deskripsi: 'Temuan sayur basi di 2 sekolah' },
  { id: 'mk3', lokasi: 'Jakarta Timur', lat: -6.2615, lng: 106.9040, jenisKasus: 'Porsi tidak standar', status: 'selesai', tanggal: '2026-03-04', deskripsi: 'Porsi makanan kurang dari standar gizi' },
  { id: 'mk4', lokasi: 'Depok', lat: -6.3923, lng: 106.8318, jenisKasus: 'Kontaminasi', status: 'aktif', tanggal: '2026-03-03', deskripsi: 'Ditemukan benda asing dalam makanan' },
  { id: 'mk5', lokasi: 'Tangerang', lat: -6.1781, lng: 106.6319, jenisKasus: 'Keracunan makanan', status: 'selesai', tanggal: '2026-02-28', deskripsi: '3 siswa dirawat karena mual dan diare' },
  { id: 'mk6', lokasi: 'Bekasi', lat: -6.2383, lng: 106.9756, jenisKasus: 'Makanan basi', status: 'investigasi', tanggal: '2026-03-01', deskripsi: 'Laporan susu kadaluarsa' },
];

// Helper to get school name by ID
export const getSekolahName = (id: string) => sekolahList.find(s => s.id === id)?.nama || 'Unknown';
export const getSppgName = (id: string) => sppgList.find(s => s.id === id)?.nama || 'Unknown';

// Chart data helpers
export const laporanPerBulan = [
  { bulan: 'Sep', jumlah: 12 }, { bulan: 'Okt', jumlah: 18 }, { bulan: 'Nov', jumlah: 15 },
  { bulan: 'Des', jumlah: 22 }, { bulan: 'Jan', jumlah: 28 }, { bulan: 'Feb', jumlah: 20 }, { bulan: 'Mar', jumlah: 10 },
];

export const kualitasGiziPerMinggu = [
  { minggu: 'W1', skor: 72 }, { minggu: 'W2', skor: 78 }, { minggu: 'W3', skor: 75 },
  { minggu: 'W4', skor: 82 }, { minggu: 'W5', skor: 80 }, { minggu: 'W6', skor: 85 }, { minggu: 'W7', skor: 88 },
];
