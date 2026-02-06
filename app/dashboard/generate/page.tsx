'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
}

interface GeneratedDocument {
  id: number;
  name: string;
  template: string;
  client: string;
  content: string;
  created: string;
}

const templates: { [key: number]: { name: string; template: string } } = {
  1: { name: 'Kontrak Kerja', template: 'kontrak_kerja' },
  2: { name: 'Surat Perjanjian Kerjasama', template: 'perjanjian_kerjasama' },
  3: { name: 'MOU', template: 'mou' },
  4: { name: 'Sertifikat Penghargaan', template: 'sertifikat' },
  5: { name: 'Surat Keterangan Kerja', template: 'keterangan_kerja' },
  6: { name: 'Confidentiality Agreement', template: 'confidentiality' },
  7: { name: 'Purchase Order', template: 'po' },
  8: { name: 'Invoice', template: 'invoice' },
};

export default function GeneratePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = Number(searchParams.get('template')) || 1;

  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [currentStep, setCurrentStep] = useState<'select' | 'preview' | 'complete'>('select');
  const [customData, setCustomData] = useState<{ [key: string]: string }>({});
  const [generatedDoc, setGeneratedDoc] = useState<GeneratedDocument | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('clients');
    if (saved) {
      setClients(JSON.parse(saved));
    }
  }, []);

  const getTemplateContent = (clientInfo: Client | null) => {
    let content = '';

    switch (templateId) {
      case 1:
        content = `SURAT PERJANJIAN KERJA

Dibuat pada tanggal: ${new Date().toLocaleDateString('id-ID')}

Antara:
1. PT/CV ${clientInfo?.company || '[Nama Perusahaan]'} selaku Pengusaha/Pemberi Kerja
2. ${selectedClient?.name || customData.nama_karyawan || '[Nama Karyawan]'} selaku Pekerja/Karyawan

DEMI TUHAN YANG MAHA ESA,

Kedua belah pihak menyatakan sepakat untuk membuat dan menandatangani Perjanjian Kerja dengan ketentuan dan syarat-syarat sebagai berikut:

BAB I - KESEPAKATAN DASAR

1. Pemberi Kerja mengangkat Pekerja untuk menduduki jabatan: ${customData.posisi || '[Posisi Jabatan]'}
2. Jenis Kontrak: ${customData.jenis_kontrak || '[Jenis Kontrak]'}
3. Tanggal Mulai Kerja: ${customData.tanggal_mulai || '[Tanggal Mulai]'}
4. Tempat Kerja: ${clientInfo?.address || '[Alamat Perusahaan]'}

BAB II - HARGA DAN PEMBAYARAN

1. Gaji Pokok: Rp. ${customData.gaji_pokok || '[Nominal Gaji]'}
2. Tunjangan: ${customData.tunjangan || '[Detail Tunjangan]'}
3. Pembayaran dilakukan setiap bulan pada tanggal: [Tanggal Pembayaran]

BAB III - WAKTU KERJA DAN ISTIRAHAT

1. Waktu kerja normal: 40 (empat puluh) jam per minggu
2. Hari kerja: Senin sampai dengan Jumat
3. Jam kerja: 08.00 - 17.00 WIB (Istirahat 12.00 - 13.00 WIB)

BAB IV - HUKUM DAN KETENTUAN UMUM

1. Perjanjian ini dibuat sesuai dengan hukum yang berlaku di Republik Indonesia
2. Setiap perubahan harus disetujui secara tertulis oleh kedua belah pihak

DEMIKIAN PERJANJIAN INI DIBUAT DENGAN SEBENARNYA DAN DITANDATANGANI OLEH KEDUA BELAH PIHAK

${new Date().toLocaleDateString('id-ID')}, [Lokasi]
Pemberi Kerja,                  Pekerja,

(_________________)             (${clientInfo?.name || '[Tanda Tangan]'})`;
        break;

      case 2:
        content = `SURAT PERJANJIAN KERJASAMA (AGREEMENT)

Tanggal: ${new Date().toLocaleDateString('id-ID')}

PIHAK-PIHAK YANG TERIKAT:
1. Perusahaan Kami
2. ${clientInfo?.company || customData.nama_perusahaan || '[Nama Perusahaan]'}

MENGINGAT:
Bahwa pihak-pihak di atas bermaksud untuk melakukan kerjasama dalam bidang ${customData.bidang || '[Bidang Kerjasama]'} dengan maksud dan tujuan untuk saling menguntungkan.

PERJANJIAN:

I. BENTUK DAN RUANG LINGKUP KERJASAMA
Kerjasama adalah dalam bentuk kemitraan strategis.

II. JANGKA WAKTU KERJASAMA
- Mulai tanggal: ${new Date().toLocaleDateString('id-ID')}
- Berakhir tanggal: ${customData.tanggal_akhir || '[Tanggal Berakhir]'}
- Dapat diperpanjang dengan perjanjian tertulis

III. HARGA DAN PEMBAYARAN
- Total nilai kerjasama: Rp. ${customData.nilai_kerjasama || '[Nominal]'}

Demikian perjanjian ini dibuat untuk dipatuhi dan dilaksanakan oleh kedua belah pihak dengan sepenuh tanggung jawab.

${new Date().toLocaleDateString('id-ID')}, [Lokasi]

(_________________)             (${clientInfo?.name || '[Nama]'})`;
        break;

      case 3:
        content = `MEMORANDUM OF UNDERSTANDING (MOU)

TANGGAL: ${new Date().toLocaleDateString('id-ID')}

PIHAK YANG TERLIBAT:
1. Perusahaan Kami
2. ${clientInfo?.company || customData.nama_perusahaan || '[Nama Perusahaan]'}

MEMAHAMI:
Bahwa para pihak berkeinginan untuk melakukan kerjasama dalam bidang: ${customData.area_kerjasama || '[Area Kerjasama]'}

DENGAN KESEPAKATAN SEBAGAI BERIKUT:

1. TUJUAN KERJASAMA
   Kerjasama ini bertujuan untuk: ${customData.tujuan || '[Tujuan Kerjasama]'}

2. AREA KERJASAMA
   Area kerjasama mencakup: ${customData.area_kerjasama || '[Area Kerjasama]'}

3. JANGKA WAKTU
   - Periode berlaku: ${customData.periode || '[Periode]'}
   - Tanggal efektif: ${new Date().toLocaleDateString('id-ID')}

4. PERANAN MASING-MASING PIHAK
   Pihak 1 bertugas: [Detail Tugas]
   Pihak 2 bertugas: [Detail Tugas]

Demikian MOU ini dibuat dengan sukarela sebagai bukti komitmen kedua belah pihak.

(_________________)             (${clientInfo?.name || '[Nama]'})`;
        break;

      case 4:
        content = `═══════════════════════════════════════════════════════════════
                    SERTIFIKAT PENGHARGAAN
═══════════════════════════════════════════════════════════════

Dengan hormat kami serahkan kepada:

                    ${clientInfo?.name || customData.nama || '[Nama Penerima]'}

PENGHARGAAN ATAS:
                    ${customData.penghargaan || '[Jenis Penghargaan]'}

Telah menunjukkan dedikasi dan prestasi yang luar biasa dalam:

                    ${customData.alasan || '[Alasan Penghargaan]'}

Diberikan pada tanggal: ${new Date().toLocaleDateString('id-ID')}

Semoga pencapaian ini menjadi motivasi untuk terus berkembang dan memberikan yang terbaik.

                    ═════════════════════
                    Direktur / Pimpinan

                    (_________________)`;
        break;

      case 5:
        content = `SURAT KETERANGAN KERJA

Nomor: SKK/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000)}

Yang bertanda tangan di bawah ini:
Nama: [Nama Direktur]
Jabatan: Direktur Perusahaan
Perusahaan: Perusahaan Kami

DENGAN INI MENERANGKAN BAHWA:

Nama: ${clientInfo?.name || customData.nama_karyawan || '[Nama Karyawan]'}
NIK: ${customData.nik || '[NIK]'}
Alamat: ${clientInfo?.address || '[Alamat]'}

TELAH BEKERJA PADA PERUSAHAAN KAMI DENGAN KETERANGAN SEBAGAI BERIKUT:

1. Posisi/Jabatan: ${customData.posisi || '[Posisi]'}
2. Departemen: ${customData.departemen || '[Departemen]'}
3. Masa Kerja:
   - Mulai tanggal: ${customData.tanggal_mulai || '[Tanggal Mulai]'}
   - Berakhir tanggal: ${new Date().toLocaleDateString('id-ID')}
   - Total masa kerja: ${customData.masa_kerja || '[Durasi]'}

4. Alasan Berhenti: ${customData.alasan_keluar || '[Alasan]'}

5. Prestasi dan Catatan Kerja:
   Karyawan ini menunjukkan dedikasi dan tanggung jawab yang baik dalam melaksanakan tugasnya.

Demikian surat keterangan ini dibuat dengan sebenarnya.

${new Date().toLocaleDateString('id-ID')}, [Lokasi]

(_________________)
Direktur Perusahaan`;
        break;

      default:
        content = `DOKUMEN: ${templates[templateId]?.name || 'Template'}\n\nDibuat untuk: ${clientInfo?.name || '[Nama Klien]'}\nPerusahaan: ${clientInfo?.company || '[Nama Perusahaan]'}\nTanggal: ${new Date().toLocaleDateString('id-ID')}\n\n[Konten dokumen akan ditampilkan di sini]`;
    }

    return content;
  };

  const handleGenerateDocument = () => {
    if (!selectedClient && !customData.nama) {
      alert('Pilih klien atau masukkan nama');
      return;
    }

    const content = getTemplateContent(selectedClient);
    const newDoc: GeneratedDocument = {
      id: Math.random(),
      name: `${templates[templateId]?.name} - ${selectedClient?.name || customData.nama}`,
      template: templates[templateId]?.name || 'Template',
      client: selectedClient?.name || customData.nama || 'Custom',
      content: content,
      created: new Date().toISOString().split('T')[0],
    };

    // Save to localStorage
    const saved = localStorage.getItem('generated_documents');
    const docs = saved ? JSON.parse(saved) : [];
    docs.push(newDoc);
    localStorage.setItem('generated_documents', JSON.stringify(docs));

    setGeneratedDoc(newDoc);
    setCurrentStep('complete');
  };

  const handleDownload = () => {
    if (!generatedDoc) return;

    const element = document.createElement('a');
    const file = new Blob([generatedDoc.content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${generatedDoc.name}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    if (!generatedDoc) return;

    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write('<html><head><title>' + generatedDoc.name + '</title></head><body>');
      printWindow.document.write('<pre style="font-family: monospace; white-space: pre-wrap;">' + generatedDoc.content + '</pre>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 100);
    }
  };

  if (currentStep === 'complete' && generatedDoc) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Dokumen Berhasil Dibuat</h2>
            <p className="text-muted-foreground mb-6">
              Dokumen Anda telah berhasil dibuat dan siap diunduh atau dicetak
            </p>
          </div>

          <Card className="p-8 border-0 shadow-sm">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Nama Dokumen</p>
                <p className="text-lg font-semibold text-foreground">{generatedDoc.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Template</p>
                <p className="text-lg font-semibold text-foreground">{generatedDoc.template}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Klien</p>
                <p className="text-lg font-semibold text-foreground">{generatedDoc.client}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tanggal Dibuat</p>
                <p className="text-lg font-semibold text-foreground">{new Date(generatedDoc.created).toLocaleDateString('id-ID')}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-sm bg-secondary/10">
            <h3 className="font-semibold text-foreground mb-4">Preview Dokumen</h3>
            <pre className="whitespace-pre-wrap text-sm text-foreground bg-muted/50 p-4 rounded-lg border border-border overflow-auto max-h-96">
              {generatedDoc.content}
            </pre>
          </Card>

          <div className="flex gap-3 flex-wrap">
            <Button onClick={handleDownload} className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Dokumen
            </Button>
            <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2 bg-transparent">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4H7a2 2 0 01-2-2v-4a2 2 0 012-2h10a2 2 0 012 2v4a2 2 0 01-2 2zm-6-4h.01M15 11h.01" />
              </svg>
              Cetak Dokumen
            </Button>
            <Button onClick={() => window.location.href = 'mailto:?subject=Dokumen&body=' + encodeURIComponent(generatedDoc.content)} variant="outline" className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Kirim Email
            </Button>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => router.push('/dashboard/archives')} variant="outline">
              Lihat di Arsip
            </Button>
            <Button onClick={() => router.push('/dashboard/generate')} variant="outline">
              Buat Dokumen Lain
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Buat Dokumen Baru</h2>
          <p className="text-muted-foreground mt-2">Generate dokumen dari template pilihan Anda. Setelah di-generate, Anda dapat mendownload, mencetaknya, atau mengirimnya ke email untuk ditanda tangani. Kemudian upload dokumen yang sudah ditanda tangani ke arsip dokumen.</p>
        </div>

        <Card className="p-6 border-0 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Template: {templates[templateId]?.name || 'Template'}
          </h3>

          <div className="space-y-6">
            {/* Select Client */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Pilih Klien atau Masukkan Data Manual</h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Pilih dari Daftar Klien</label>
                  <select
                    value={selectedClient?.id || ''}
                    onChange={(e) => {
                      const client = clients.find(c => c.id === Number(e.target.value));
                      setSelectedClient(client || null);
                    }}
                    className="w-full p-2 border border-border rounded-lg bg-input text-foreground"
                  >
                    <option value="">-- Pilih Klien --</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.name} - {client.company}
                      </option>
                    ))}
                  </select>
                </div>

                {!selectedClient && (
                  <div className="space-y-3 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">atau</p>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Nama</label>
                      <Input
                        placeholder="Nama klien"
                        value={customData.nama || ''}
                        onChange={(e) => setCustomData({ ...customData, nama: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Perusahaan</label>
                      <Input
                        placeholder="Nama perusahaan"
                        value={customData.perusahaan || ''}
                        onChange={(e) => setCustomData({ ...customData, perusahaan: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {selectedClient && (
                  <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm font-medium text-foreground">Klien yang Dipilih:</p>
                    <p className="text-foreground font-semibold">{selectedClient.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedClient.company}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Fields */}
            {templateId === 1 && (
              <div className="space-y-3 border-t border-border pt-6">
                <h4 className="font-medium text-foreground">Data Tambahan (Opsional)</h4>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Posisi Jabatan</label>
                  <Input
                    placeholder="contoh: Manager IT"
                    value={customData.posisi || ''}
                    onChange={(e) => setCustomData({ ...customData, posisi: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Gaji Pokok</label>
                  <Input
                    placeholder="contoh: 5.000.000"
                    value={customData.gaji_pokok || ''}
                    onChange={(e) => setCustomData({ ...customData, gaji_pokok: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Jenis Kontrak</label>
                  <Input
                    placeholder="contoh: Kontrak Tetap"
                    value={customData.jenis_kontrak || ''}
                    onChange={(e) => setCustomData({ ...customData, jenis_kontrak: e.target.value })}
                  />
                </div>
              </div>
            )}

            {templateId === 2 && (
              <div className="space-y-3 border-t border-border pt-6">
                <h4 className="font-medium text-foreground">Data Kerjasama</h4>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Bidang Kerjasama</label>
                  <Input
                    placeholder="contoh: Penjualan Produk"
                    value={customData.bidang || ''}
                    onChange={(e) => setCustomData({ ...customData, bidang: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Nilai Kerjasama</label>
                  <Input
                    placeholder="contoh: 100.000.000"
                    value={customData.nilai_kerjasama || ''}
                    onChange={(e) => setCustomData({ ...customData, nilai_kerjasama: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="border-t border-border pt-6 flex gap-3">
              <Button
                onClick={handleGenerateDocument}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Generate Dokumen
              </Button>
              <Button variant="outline" onClick={() => router.back()}>
                Kembali
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
