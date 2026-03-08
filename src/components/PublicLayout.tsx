import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from '@/components/PublicNavbar';
import Footer from './Footer';

const PublicLayout: React.FC = () => (
  <div className="min-h-screen">
    <PublicNavbar />
    <main className="pt-16">
      <Outlet />
    </main>
    <Footer/>
  </div>
);

export default PublicLayout;
