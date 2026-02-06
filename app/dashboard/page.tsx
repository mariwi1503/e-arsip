'use client';

import React from "react"

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  const stats = [
    { label: 'Total Klien', value: '24', icon: 'users', color: 'bg-primary/10 text-primary' },
    { label: 'Dokumen Arsip', value: '156', icon: 'archive', color: 'bg-accent/10 text-accent' },
    { label: 'Template', value: '8', icon: 'template', color: 'bg-secondary/10 text-secondary' },
    { label: 'Dokumen Bulan Ini', value: '12', icon: 'calendar', color: 'bg-primary/10 text-primary' },
  ];

  const recentDocuments = [
    { id: 1, name: 'Kontrak Kerja - PT Maju Jaya', type: 'Kontrak', date: '2024-02-01', client: 'PT Maju Jaya' },
    { id: 2, name: 'Sertifikat ISO - PT Bersama', type: 'Sertifikat', date: '2024-01-28', client: 'PT Bersama' },
    { id: 3, name: 'MOU Kerjasama - CV Sukses', type: 'Perjanjian', date: '2024-01-25', client: 'CV Sukses' },
  ];

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      users: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 12H9m4 5h4m0 0h4m-4 0v4m0-4v-4m-4 0h-4m4 0v4m0-4v-4" />
        </svg>
      ),
      archive: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      template: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      calendar: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    };
    return icons[iconName];
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-2">Selamat Datang di E-Arsip</h2>
          <p className="text-muted-foreground mb-4">
            Sistem manajemen dokumen terpadu untuk perusahaan Anda. Kelola klien, arsipkan dokumen, dan hasilkan kontrak dengan mudah.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/dashboard/generate">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Buat Dokumen Baru
              </Button>
            </Link>
            <Link href="/dashboard/templates">
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 bg-transparent">
                Lihat Template
              </Button>
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Ringkasan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                    {getIcon(stat.icon)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Documents */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Dokumen Terbaru</h3>
            <Link href="/dashboard/archives">
              <Button variant="outline" size="sm">
                Lihat Semua
              </Button>
            </Link>
          </div>
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted">
                    <th className="text-left p-4 font-semibold text-foreground">Nama Dokumen</th>
                    <th className="text-left p-4 font-semibold text-foreground">Klien</th>
                    <th className="text-left p-4 font-semibold text-foreground">Tipe</th>
                    <th className="text-left p-4 font-semibold text-foreground">Tanggal</th>
                    <th className="text-right p-4 font-semibold text-foreground">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDocuments.map((doc) => (
                    <tr key={doc.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="p-4 font-medium text-foreground">{doc.name}</td>
                      <td className="p-4 text-muted-foreground">{doc.client}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {doc.type}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground text-sm">{doc.date}</td>
                      <td className="p-4 text-right">
                        <Button variant="outline" size="sm">
                          Lihat
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
