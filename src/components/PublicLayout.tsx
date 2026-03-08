import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from '@/components/PublicNavbar';

const PublicLayout: React.FC = () => (
  <div className="min-h-screen">
    <PublicNavbar />
    <main className="pt-16">
      <Outlet />
    </main>
  </div>
);

export default PublicLayout;
