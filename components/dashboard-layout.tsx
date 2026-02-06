'use client';

import React from "react"

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface User {
  email: string;
  name: string;
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('user');

    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: 'home' },
    { href: '/dashboard/clients', label: 'Daftar Klien', icon: 'users' },
    { href: '/dashboard/archives', label: 'Arsip Dokumen', icon: 'archive' },
    { href: '/dashboard/templates', label: 'Template Dokumen', icon: 'template' },
    { href: '/dashboard/generate', label: 'Buat Dokumen', icon: 'plus' },
  ];

  const getPageInfo = () => {
    const pageMap: { [key: string]: { title: string; description: string; icon: string } } = {
      '/dashboard': { title: 'Dashboard', description: 'Ringkasan dan statistik aplikasi', icon: 'home' },
      '/dashboard/clients': { title: 'Daftar Klien', description: 'Kelola data klien dan perusahaan', icon: 'users' },
      '/dashboard/archives': { title: 'Arsip Dokumen', description: 'Kelola dokumen yang telah diupload', icon: 'archive' },
      '/dashboard/templates': { title: 'Template Dokumen', description: 'Template untuk membuat dokumen baru', icon: 'template' },
      '/dashboard/generate': { title: 'Buat Dokumen', description: 'Generate dokumen dari template', icon: 'plus' },
    };
    return pageMap[pathname] || { title: 'Dashboard', description: '', icon: 'home' };
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      home: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v7a1 1 0 001 1h12a1 1 0 001-1V9m-9 4l4 2m-8-4l4-2" />
        </svg>
      ),
      users: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 12H9m4 5h4m0 0h4m-4 0v4m0-4v-4m-4 0h-4m4 0v4m0-4v-4" />
        </svg>
      ),
      archive: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      template: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      plus: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
    };
    return icons[iconName];
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 border-b border-sidebar-border flex items-center justify-between px-6">
          {sidebarOpen && (
            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              {sidebarOpen && <span className="text-sidebar-foreground">E-Arsip</span>}
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-sidebar-accent rounded-lg transition-colors text-sidebar-foreground"
          >
            {sidebarOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href + '/')) || (item.href === '/dashboard' && pathname === '/dashboard');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                {getIcon(item.icon)}
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="border-t border-sidebar-border p-4">
          {sidebarOpen ? (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-sidebar-accent/50">
                <div className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</div>
                <div className="text-xs text-sidebar-foreground/60 truncate">{user?.email}</div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent bg-transparent"
                size="sm"
              >
                Logout
              </Button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
              title="Logout"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col">
        {(() => {
          const pageInfo = getPageInfo();
          return (
            <div className="border-b border-border bg-card px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <div className="text-primary">
                    {getIcon(pageInfo.icon)}
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{pageInfo.title}</h1>
                  {pageInfo.description && (
                    <p className="text-sm text-muted-foreground mt-0.5">{pageInfo.description}</p>
                  )}
                </div>
              </div>
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 hover:bg-muted rounded-lg text-foreground"
                  title="Buka sidebar"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}
            </div>
          );
        })()}
        <div className="flex-1 overflow-auto p-8">{children}</div>
      </main>
    </div>
  );
}
