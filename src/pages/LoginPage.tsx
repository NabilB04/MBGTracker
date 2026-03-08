import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const roleRedirects: Record<UserRole, string> = {
  admin: '/admin',
  sppg: '/sppg',
  sekolah: '/sekolah',
  public: '/',
};

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('admin');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password, role);
    if (success) {
      toast.success('Berhasil masuk!');
      navigate(roleRedirects[role]);
    } else {
      toast.error('Email atau password salah');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero-soft p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-5xl block mb-3">🍱</span>
          <h1 className="font-heading text-3xl font-bold text-foreground">GiziTrack</h1>
          <p className="text-muted-foreground mt-1">Platform Monitoring MBG Indonesia</p>
        </div>

        <div className="bg-card rounded-lg shadow-card-hover p-6 space-y-5">
          <div>
            <Label>Masuk sebagai</Label>
            <Select value={role} onValueChange={v => setRole(v as UserRole)}>
              <SelectTrigger className="mt-1.5 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="sppg">SPPG</SelectItem>
                <SelectItem value="sekolah">Sekolah</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@mbg.id" value={email} onChange={e => setEmail(e.target.value)} className="mt-1.5 rounded-lg" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="mt-1.5 rounded-lg" required />
            </div>
            <Button type="submit" className="w-full rounded-lg" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Masuk
            </Button>
          </form>

          <div className="text-xs text-muted-foreground bg-muted rounded-lg p-3">
            <p className="font-semibold mb-1">Akun Demo</p>
            <p>Admin = admin@mbg.id / admin123</p>
            <p>SPPG = sppg@mbg.id / sppg123</p>
            <p>Sekolah = sekolah@mbg.id / sekolah123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
