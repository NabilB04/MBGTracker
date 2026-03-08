import { Sekolah, SPPG, MenuHarian, LaporanWarga, DataSampah, ArtikelEdukasi, MonitoringKasus } from '@/types';
import { Apple, Beef, Brain, Droplets, Leaf, Shield, Sunrise, Zap } from 'lucide-react';

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

export const artikelList = [
  {
    id: 'A001',
    judul: 'Pentingnya Sarapan Sebelum Sekolah untuk Konsentrasi Belajar',
    penulis: 'Dr. Siti Rahayu, M.Gz',
    tanggal: '7 Mar 2026',
    kategori: 'Nutrisi Anak',
    estimasiBaca: '4 menit',
    deskripsi: 'Sarapan adalah fondasi energi anak di pagi hari. Penelitian menunjukkan anak yang rutin sarapan memiliki kemampuan konsentrasi 30% lebih baik dibanding yang melewatkannya.',
    konten: `Sarapan yang baik mengandung kombinasi karbohidrat kompleks, protein, dan lemak sehat. Karbohidrat seperti nasi, roti gandum, atau oatmeal memberikan energi bertahap yang tahan hingga siang. Protein dari telur atau susu membantu regenerasi sel otak.\n\nStudi dari Universitas Indonesia (2024) menunjukkan bahwa siswa yang sarapan secara rutin memiliki nilai ujian rata-rata 15% lebih tinggi dibanding yang tidak sarapan. Energi yang stabil juga membuat anak lebih fokus saat menerima pelajaran.\n\nRekomendasi sarapan ideal untuk anak usia 6–12 tahun: 1 porsi nasi/roti, 1 butir telur atau 100g protein lainnya, 1 gelas susu, dan 1 porsi buah. Total kalori yang ideal adalah 250–350 kkal.`,
    gambar: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80',
    katBg: '#FFF1F0',
    katColor: '#FC5F53',
  },
  {
    id: 'A002',
    judul: 'Protein: Kunci Tumbuh Kembang Optimal Anak Usia Sekolah',
    penulis: 'Ahli Gizi Budi Santoso',
    tanggal: '5 Mar 2026',
    kategori: 'Tumbuh Kembang',
    estimasiBaca: '5 menit',
    deskripsi: 'Protein berperan vital dalam pembentukan otot, hormon, dan enzim anak. Kekurangan protein berdampak langsung pada tinggi badan dan kemampuan kognitif.',
    konten: `Protein terdiri dari asam amino yang merupakan bahan baku sel tubuh. Untuk anak usia 7–12 tahun, kebutuhan protein harian berkisar antara 25–35 gram per hari, setara dengan 2 butir telur, 100g ayam, atau 150g tempe.\n\nSumber protein hewani seperti ikan, telur, dan daging ayam mengandung asam amino esensial lengkap. Sementara sumber nabati seperti tempe, tahu, dan kacang-kacangan juga baik, namun perlu dikombinasikan untuk profil asam amino yang lengkap.\n\nProgram MBG menargetkan setiap porsi mengandung minimal 15 gram protein. Menu seperti ayam goreng + tempe + telur dadar dalam satu hari dapat memenuhi 80% kebutuhan protein harian anak.`,
    gambar: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=600&q=80',
    katBg: '#EBF5F0',
    katColor: '#2D6A4F',
  },
  {
    id: 'A003',
    judul: '5 Porsi Buah & Sayur Sehari: Mudah Dicapai dengan Cara Ini',
    penulis: 'Nutrisionis Dewi Putri',
    tanggal: '3 Mar 2026',
    kategori: 'Gaya Hidup Sehat',
    estimasiBaca: '3 menit',
    deskripsi: 'WHO merekomendasikan 5 porsi buah dan sayur per hari. Tapi bagaimana cara praktis memenuhinya dalam menu makan anak sekolah sehari-hari?',
    konten: `Lima porsi buah dan sayur per hari terdengar banyak, namun sebenarnya mudah dicapai jika direncanakan. Satu porsi setara dengan 80 gram atau seukuran kepalan tangan.\n\nSarapan: tambahkan sepotong pisang atau setengah mangga. Makan siang: 2 porsi sayuran dalam menu MBG (bayam, kangkung, wortel). Sore: 1 buah apel atau jeruk sebagai camilan. Makan malam: 1 porsi tumis sayur.\n\nManfaat rutin mengonsumsi buah dan sayur: sistem imun lebih kuat, pencernaan lancar, kulit sehat, dan risiko anemia berkurang. Vitamin C dari buah juga membantu penyerapan zat besi dari lauk pauk.`,
    gambar: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&q=80',
    katBg: '#FFF8EC',
    katColor: '#F59E0B',
  },
  {
    id: 'A004',
    judul: 'Bahaya Tersembunyi Junk Food bagi Perkembangan Otak Anak',
    penulis: 'Prof. Andi Kurniawan, SpGK',
    tanggal: '1 Mar 2026',
    kategori: 'Peringatan Gizi',
    estimasiBaca: '6 menit',
    deskripsi: 'Makanan ultra-proses tinggi gula dan lemak trans bukan hanya merusak fisik, tapi juga terbukti menurunkan kemampuan memori dan konsentrasi anak.',
    konten: `Junk food atau makanan ultra-proses mengandung kadar gula, garam, dan lemak jenuh yang jauh melampaui kebutuhan anak. Konsumsi berlebihan dapat menyebabkan lonjakan gula darah yang cepat diikuti penurunan drastis, membuat anak mudah mengantuk dan sulit fokus.\n\nPenelitian dari Harvard Medical School menunjukkan anak yang sering mengonsumsi makanan tinggi gula memiliki volume hippocampus (pusat memori otak) yang lebih kecil. Efek ini mulai terlihat setelah 6 bulan konsumsi rutin.\n\nAlternatif sehat pengganti junk food: keripik ubi panggang, buah segar, yogurt rendah gula, kacang panggang, atau sandwich isi sayur dan telur. Perubahan bertahap lebih efektif daripada larangan total.`,
    gambar: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&q=80',
    katBg: '#FFF1F0',
    katColor: '#FC5F53',
  },
  {
    id: 'A005',
    judul: 'Kebutuhan Cairan Anak Sekolah: Berapa Gelas Air Per Hari?',
    penulis: 'Dr. Lina Wati, SpA',
    tanggal: '28 Feb 2026',
    kategori: 'Hidrasi',
    estimasiBaca: '3 menit',
    deskripsi: 'Dehidrasi ringan saja dapat menurunkan performa kognitif anak hingga 10%. Pastikan anak minum cukup air sepanjang hari sekolah.',
    konten: `Anak usia 7–12 tahun membutuhkan sekitar 1.5–2 liter air per hari (6–8 gelas). Namun saat cuaca panas atau aktivitas fisik meningkat, kebutuhan ini bisa naik 20–30%.\n\nTanda-tanda dehidrasi ringan pada anak: mudah lelah, sakit kepala, kesulitan berkonsentrasi, dan urine berwarna kuning pekat. Banyak anak tidak menyadari dirinya dehidrasi karena tidak selalu merasa haus.\n\nTips membiasakan minum air: bawa botol minum ke sekolah, minum segelas air sebelum dan sesudah makan, serta konsumsi buah-buahan dengan kandungan air tinggi seperti semangka, melon, dan jeruk.`,
    gambar: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=600&q=80',
    katBg: '#E0F7FA',
    katColor: '#0891B2',
  },
  {
    id: 'A006',
    judul: 'Zat Besi & Anemia: Ancaman Tersembunyi bagi Siswa Indonesia',
    penulis: 'Ahli Gizi Rini Kusuma',
    tanggal: '25 Feb 2026',
    kategori: 'Nutrisi Anak',
    estimasiBaca: '5 menit',
    deskripsi: '26% anak usia sekolah di Indonesia mengalami anemia akibat kekurangan zat besi. Kondisi ini berdampak langsung pada prestasi akademik dan daya tahan tubuh.',
    konten: `Anemia defisiensi besi adalah kondisi kekurangan sel darah merah akibat rendahnya asupan atau penyerapan zat besi. Di Indonesia, masalah ini masih menjadi tantangan besar, terutama di daerah dengan akses pangan terbatas.\n\nGejala anemia pada anak: pucat, mudah lelah, sering sakit kepala, dan penurunan prestasi belajar. Banyak kasus tidak terdeteksi karena gejala yang samar.\n\nSumber zat besi terbaik: daging merah, hati ayam, ikan, dan sayuran hijau seperti bayam dan kangkung. Konsumsi bersama vitamin C meningkatkan penyerapan zat besi hingga 3x lipat. Program MBG berupaya memastikan setiap menu mengandung sumber zat besi yang cukup.`,
    gambar: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80',
    katBg: '#EBF5F0',
    katColor: '#2D6A4F',
  },
];

export const tips = [
  {
    Icon: Sunrise,
    title: 'Sarapan Bergizi',
    desc: 'Awali hari dengan karbohidrat kompleks, protein, dan serat untuk energi yang tahan hingga siang.',
    color: '#FC5F53',
    bg: '#FFF1F0',
  },
  {
    Icon: Beef,
    title: 'Cukupi Protein',
    desc: 'Anak butuh 25–35g protein per hari dari telur, ikan, ayam, tempe untuk tumbuh kembang optimal.',
    color: '#2D6A4F',
    bg: '#EBF5F0',
  },
  {
    Icon: Leaf,
    title: 'Buah & Sayur',
    desc: '5 porsi buah dan sayur setiap hari untuk vitamin, mineral, dan menjaga sistem imun tetap kuat.',
    color: '#F59E0B',
    bg: '#FFF8EC',
  },
  {
    Icon: Shield,
    title: 'Hindari Junk Food',
    desc: 'Kurangi makanan tinggi gula dan lemak trans yang terbukti menurunkan konsentrasi belajar.',
    color: '#8B5CF6',
    bg: '#F3F0FF',
  },
  {
    Icon: Droplets,
    title: 'Minum Cukup Air',
    desc: 'Dehidrasi ringan menurunkan performa kognitif 10%. Biasakan 6–8 gelas air per hari.',
    color: '#0891B2',
    bg: '#E0F7FA',
  },
  {
    Icon: Brain,
    title: 'Gizi untuk Otak',
    desc: 'Omega-3 dari ikan, seng dari kacang-kacangan, dan vitamin B sangat penting untuk perkembangan otak.',
    color: '#EC4899',
    bg: '#FDF2F8',
  },
  {
    Icon: Apple,
    title: 'Camilan Sehat',
    desc: 'Ganti camilan berminyak dengan buah segar, yogurt, atau kacang panggang untuk energi tambahan.',
    color: '#DC2626',
    bg: '#FEF2F2',
  },
  {
    Icon:   Zap,
    title: 'Jadwal Makan Teratur',
    desc: '3 makan utama dan 1–2 camilan di waktu tetap membantu menjaga kadar gula darah tetap stabil.',
    color: '#D97706',
    bg: '#FFFBEB',
  },
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



export const monitoringKasusList = [
  {
    id: 'K001', lokasi: 'SDN Menteng 2, Jakarta Pusat', jenisKasus: 'Makanan Kadaluarsa',
    tanggal: '07 Mar 2026', status: 'aktif',
    deskripsi: 'Ditemukan 50 kotak susu UHT dengan tanggal kedaluwarsa 3 hari sebelumnya.',
    lat: -6.1944, lng: 106.8294, korban: 12, penanganan: 'Dilaporkan ke Dinas Kesehatan',
  },
  {
    id: 'K002', lokasi: 'MI Al-Hidayah, Tangerang Selatan', jenisKasus: 'Dugaan Keracunan',
    tanggal: '06 Mar 2026', status: 'investigasi',
    deskripsi: '8 siswa mengalami mual dan pusing setelah makan siang. Diduga akibat ayam yang kurang matang.',
    lat: -6.2897, lng: 106.7160, korban: 8, penanganan: 'Tim puskesmas sedang investigasi',
  },
  {
    id: 'K003', lokasi: 'SDN Cibubur 3, Jakarta Timur', jenisKasus: 'Benda Asing',
    tanggal: '04 Mar 2026', status: 'selesai',
    deskripsi: 'Ditemukan serpihan plastik kemasan dalam sayur bayam. Sudah dilaporkan ke SPPG Cibubur.',
    lat: -6.3606, lng: 106.9111, korban: 0, penanganan: 'SPPG sudah mengganti pemasok sayur',
  },
  {
    id: 'K004', lokasi: 'SDN Ciputat 1, Tangerang Selatan', jenisKasus: 'Porsi Tidak Sesuai',
    tanggal: '05 Mar 2026', status: 'selesai',
    deskripsi: 'Porsi nasi yang diterima siswa hanya separuh dari standar 200g yang ditetapkan.',
    lat: -6.3225, lng: 106.7445, korban: 0, penanganan: 'SPPG Ciputat sudah diberi peringatan tertulis',
  },
  {
    id: 'K005', lokasi: 'SDN Tangerang 5, Kota Tangerang', jenisKasus: 'Makanan Basi',
    tanggal: '03 Mar 2026', status: 'aktif',
    deskripsi: 'Tempe mendoan berbau tidak sedap dan terasa asam. Distribusi terlambat 4 jam dari jadwal.',
    lat: -6.1783, lng: 106.6319, korban: 5, penanganan: 'Menunggu tindak lanjut SPPG Tangerang',
  },
  {
    id: 'K006', lokasi: 'SDN Bekasi Utara 2, Bekasi', jenisKasus: 'Dugaan Keracunan',
    tanggal: '28 Feb 2026', status: 'selesai',
    deskripsi: '15 siswa dilaporkan diare setelah makan nasi dengan lauk ikan goreng. Hasil lab negatif.',
    lat: -6.2349, lng: 106.9946, korban: 15, penanganan: 'Kasus ditutup, siswa pulih sepenuhnya',
  },
  {
    id: 'K007', lokasi: 'MI Nurul Iman, Depok', jenisKasus: 'Higienitas Rendah',
    tanggal: '01 Mar 2026', status: 'investigasi',
    deskripsi: 'Foto kondisi dapur SPPG yang beredar viral menunjukkan dapur kotor dan tidak higienis.',
    lat: -6.4025, lng: 106.7942, korban: 0, penanganan: 'Inspeksi mendadak oleh Dinas Ketahanan Pangan',
  },
];

export const kasusPerBulan = [
  { bulan: 'Sep', kasus: 5 },
  { bulan: 'Okt', kasus: 8 },
  { bulan: 'Nov', kasus: 6 },
  { bulan: 'Des', kasus: 11 },
  { bulan: 'Jan', kasus: 14 },
  { bulan: 'Feb', kasus: 9 },
  { bulan: 'Mar', kasus: 7 },
];


export const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  aktif:       { label: 'Aktif',       color: '#FC5F53', bg: '#FFF1F0' },
  investigasi: { label: 'Investigasi', color: '#FFB84D', bg: '#FFF8EC' },
  selesai:     { label: 'Selesai',     color: '#2D6A4F', bg: '#EBF5F0' },
};