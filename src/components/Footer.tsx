import { ChevronRight, Facebook, Instagram, MapPin, Mail, Phone, Twitter, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
      <footer className="bg-secondary text-secondary-foreground">
        {/* Main footer */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🍱</span>
                <span className="font-heading font-bold text-xl">MbgTrack</span>
              </div>
              <p className="text-secondary-foreground/60 text-sm leading-relaxed mb-6">
                Platform monitoring program Makan Bergizi Gratis untuk memastikan setiap anak Indonesia mendapatkan nutrisi terbaik.
              </p>
              <div className="flex items-center gap-3">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider">Menu Utama</h4>
              <ul className="space-y-2.5">
                {['Dashboard', 'Menu Sekolah', 'Laporan Warga', 'Monitoring Kasus', 'Edukasi Gizi', 'AI Scanner'].map((item, i) => (
                  <li key={i}>
                    <Link to={['/', '/menu-sekolah', '/laporan', '/monitoring-kasus', '/edukasi', '/ai-scanner'][i]} className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors flex items-center gap-1">
                      <ChevronRight className="h-3 w-3" />{item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div>
              <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider">Informasi</h4>
              <ul className="space-y-2.5">
                {['Tentang Program MBG', 'Kebijakan Privasi', 'Syarat & Ketentuan', 'FAQ', 'Panduan Pelaporan'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors flex items-center gap-1">
                      <ChevronRight className="h-3 w-3" />{item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider">Hubungi Kami</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-secondary-foreground/60">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  <span>Jl. Jenderal Sudirman Kav. 52-53, Jakarta Selatan 12190</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-secondary-foreground/60">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <span>(021) 1234-5678</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-secondary-foreground/60">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <span>info@MbgTrack.id</span>
                </li>
              </ul>
              <div className="mt-5 p-4 rounded-xl bg-secondary-foreground/5 border border-secondary-foreground/10">
                <p className="text-xs text-secondary-foreground/60">Hotline Pengaduan 24 Jam</p>
                <p className="font-heading font-bold text-primary text-lg mt-1">1500-MBG</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-secondary-foreground/10">
          <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-secondary-foreground/40">© 2026 MbgTrack — Platform Monitoring MBG Indonesia. Hak cipta dilindungi.</p>
            <p className="text-xs text-secondary-foreground/40">Dikelola oleh Kementerian Pendidikan & Kebudayaan RI</p>
          </div>
        </div>
      </footer>
    )
}

export default Footer