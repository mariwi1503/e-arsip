'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Template {
  id: number;
  name: string;
  description: string;
  category: string;
  fields: string[];
}

export default function TemplatesPage() {
  const templates: Template[] = [
    {
      id: 1,
      name: 'Kontrak Kerja',
      description: 'Perjanjian kerja antara perusahaan dan karyawan dengan ketentuan gaji, benefit, dan tanggung jawab.',
      category: 'Kontrak',
      fields: ['nama_karyawan', 'posisi', 'gaji_pokok', 'tanggal_mulai', 'jenis_kontrak'],
    },
    {
      id: 2,
      name: 'Surat Perjanjian Kerjasama',
      description: 'Dokumen resmi untuk membentuk kerjasama bisnis antara dua atau lebih pihak.',
      category: 'Perjanjian',
      fields: ['nama_perusahaan_1', 'nama_perusahaan_2', 'tujuan_kerjasama', 'durasi', 'nilai_kerjasama'],
    },
    {
      id: 3,
      name: 'MOU (Memorandum of Understanding)',
      description: 'Dokumen kesepakatan awal yang menunjukkan komitmen untuk melakukan kerjasama lebih lanjut.',
      category: 'Perjanjian',
      fields: ['pihak_1', 'pihak_2', 'area_kerjasama', 'tanggal_efektif', 'periode_berlaku'],
    },
    {
      id: 4,
      name: 'Sertifikat Penghargaan',
      description: 'Dokumen yang diberikan untuk mengakui prestasi atau pencapaian seseorang atau organisasi.',
      category: 'Sertifikat',
      fields: ['nama_penerima', 'penghargaan', 'tanggal', 'alasan', 'ditanda_tangani_oleh'],
    },
    {
      id: 5,
      name: 'Surat Keterangan Kerja',
      description: 'Dokumen yang menyatakan bahwa seseorang telah bekerja di perusahaan dan riwayat pekerjaannya.',
      category: 'Surat',
      fields: ['nama_karyawan', 'nik', 'posisi', 'periode_kerja', 'alasan_keluar'],
    },
    {
      id: 6,
      name: 'Dokumen Confidentiality Agreement',
      description: 'Perjanjian untuk menjaga kerahasiaan informasi perusahaan oleh karyawan atau pihak ketiga.',
      category: 'Perjanjian',
      fields: ['nama_pihak', 'informasi_rahasia', 'durasi_kerahasiaan', 'pengecualian', 'tanggal_efektif'],
    },
    {
      id: 7,
      name: 'Purchase Order (PO)',
      description: 'Dokumen pemesanan barang atau jasa dari supplier dengan detail dan harga yang disepakati.',
      category: 'Dokumen Bisnis',
      fields: ['nama_supplier', 'nomor_po', 'tanggal_pesan', 'tanggal_kirim', 'total_harga'],
    },
    {
      id: 8,
      name: 'Invoice / Faktur',
      description: 'Dokumen tagihan untuk pembayaran barang atau jasa yang telah diberikan kepada klien.',
      category: 'Dokumen Bisnis',
      fields: ['nomor_invoice', 'tanggal_invoice', 'nama_klien', 'total_tagihan', 'jatuh_tempo'],
    },
  ];

  const categories = Array.from(new Set(templates.map(t => t.category)));

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">Template Dokumen</h2>
          <p className="text-muted-foreground mt-2">Pilih template untuk membuat dokumen baru. Setelah dokumen di-generate, Anda dapat mencetaknya, mengirimkannya ke email untuk ditanda tangani, kemudian meng-uploadnya ke arsip dokumen.</p>
        </div>

        {/* Templates by Category */}
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-foreground mb-4">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.filter(t => t.category === category).map((template) => (
                <Card key={template.id} className="p-6 border-0 shadow-sm hover:shadow-md transition-all hover:border-primary/20 hover:-translate-y-1">
                  <div className="space-y-4 h-full flex flex-col">
                    <div>
                      <h4 className="font-semibold text-foreground text-lg mb-2">{template.name}</h4>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>

                    <div className="flex-1">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Field yang diisi:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.fields.map((field) => (
                          <span
                            key={field}
                            className="px-2 py-1 rounded text-xs bg-primary/10 text-primary"
                          >
                            {field.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border flex gap-2">
                      <Link href={`/dashboard/templates/${template.id}`} className="flex-1">
                        <Button variant="outline" className="w-full bg-transparent">
                          Lihat Preview
                        </Button>
                      </Link>
                      <Link href={`/dashboard/generate?template=${template.id}`} className="flex-1">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          Gunakan
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Download Templates Info */}
        <Card className="p-6 border-0 shadow-sm bg-secondary/10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v-4m0 0V8m0 4h4m-4 0H8" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">Tips Menggunakan Template</h4>
              <p className="text-sm text-muted-foreground">
                Klik tombol "Gunakan" untuk membuat dokumen baru berdasarkan template pilihan. Anda dapat mengisi data klien dari daftar yang ada, dan sistem akan secara otomatis mengisi template dengan informasi tersebut. Dokumen yang telah dibuat dapat diunduh, dicetak, atau dikirim melalui email.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
