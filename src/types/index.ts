export type UserRole = 'admin' | 'sppg' | 'sekolah' | 'public';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organization?: string;
}

export interface Sekolah {
  id: string;
  nama: string;
  alamat: string;
  sppgId: string;
  jumlahSiswa: number;
}

export interface SPPG {
  id: string;
  nama: string;
  alamat: string;
  jumlahSekolahBinaan: number;
  kontak: string;
  statusAktif: boolean;
}

export interface MenuItem {
  id: string;
  nama: string;
  porsi: string;
  kalori: number;
  protein: number;
  karbohidrat: number;
  lemak: number;
  harga: number;
}

export interface MenuHarian {
  id: string;
  tanggal: string;
  sekolahId: string;
  sppgId: string;
  items: MenuItem[];
}

export interface LaporanWarga {
  id: string;
  pelapor: string;
  nomorHp: string;
  sekolahId: string;
  jenisLaporan: string;
  deskripsi: string;
  tanggal: string;
  status: 'belum' | 'proses' | 'selesai';
  tiketNomor: string;
  catatanAdmin?: string;
}

export interface DataSampah {
  id: string;
  sekolahId: string;
  tanggal: string;
  organik: number;
  anorganik: number;
  pelapor: string;
  foto?: string;
  jumlahOmpreng?: number;
  catatan?: string;
}

export interface ArtikelEdukasi {
  id: string;
  judul: string;
  penulis: string;
  deskripsi: string;
  konten: string;
  thumbnail: string;
  tanggal: string;
}

export interface MonitoringKasus {
  id: string;
  lokasi: string;
  lat: number;
  lng: number;
  jenisKasus: string;
  status: 'aktif' | 'investigasi' | 'selesai';
  tanggal: string;
  deskripsi: string;
}
