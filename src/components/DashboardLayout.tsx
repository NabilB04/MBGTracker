import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, LogOut, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarLink {
  icon: string;
  label: string;
  to: string;
}

interface DashboardLayoutProps {
  links: SidebarLink[];
  accentClass?: string;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ links, accentClass = 'bg-secondary', title }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen flex w-full">
      {/* Sidebar */}
      <aside
        className={`${accentClass} text-secondary-foreground fixed inset-y-0 left-0 z-40 flex flex-col transition-all duration-300
          ${collapsed ? 'w-16' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-foreground/10">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl">🍱</span>
              <span className="font-heading font-bold text-sm">{title}</span>
            </Link>
          )}
          <button onClick={() => { setCollapsed(!collapsed); setMobileOpen(false); }} className="p-1 rounded hover:bg-foreground/10 hidden lg:block">
            <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {links.map(link => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active ? 'bg-foreground/15 text-secondary-foreground' : 'text-secondary-foreground/70 hover:bg-foreground/10 hover:text-secondary-foreground'
                }`}
              >
                <span className="text-base">{link.icon}</span>
                {!collapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-foreground/10">
          {!collapsed && (
            <div className="mb-3 text-xs text-secondary-foreground/60">
              <div className="font-medium text-secondary-foreground/80">{user?.name}</div>
              <div>{user?.email}</div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full justify-start text-secondary-foreground/70 hover:text-secondary-foreground hover:bg-foreground/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {!collapsed && 'Keluar'}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <header className="h-16 flex items-center border-b bg-card px-4 sticky top-0 z-30">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 mr-2">
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-heading font-semibold text-lg">{title}</h1>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-foreground/20 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
    </div>
  );
};

export default DashboardLayout;
