'use client';

import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const templates: { [key: number]: { name: string; content: string } } = {
  1: {
    name: 'Kontrak Kerja',
    content: `SURAT PERJANJIAN KERJA

Dibuat pada tanggal: _______________

Antara:
1. _________________ selaku Pengusaha/Pemberi Kerja
2. _________________ selaku Pekerja/Karyawan

DEMI TUHAN YANG MAHA ESA,

Kedua belah pihak menyatakan sepakat untuk membuat dan menandatangani Perjanjian Kerja dengan ketentuan dan syarat-syarat sebagai berikut:

BAB I - KESEPAKATAN DASAR

1. Pemberi Kerja mengangkat Pekerja untuk menduduki jabatan: _________________
2. Jenis Kontrak: _________________
3. Tanggal Mulai Kerja: _________________
4. Tempat Kerja: _________________

BAB II - HARGA DAN PEMBAYARAN

1. Gaji Pokok: Rp. _________________
2. Tunjangan: _________________
3. Pembayaran dilakukan setiap bulan pada tanggal: _________________

BAB III - WAKTU KERJA DAN ISTIRAHAT

1. Waktu kerja normal: 40 (empat puluh) jam per minggu
2. Hari kerja: Senin sampai dengan Jumat
3. Jam kerja: 08.00 - 17.00 WIB (Istirahat 12.00 - 13.00 WIB)

BAB IV - HUKUM DAN KETENTUAN UMUM

1. Perjanjian ini dibuat sesuai dengan hukum yang berlaku di Republik Indonesia
2. Setiap perubahan harus disetujui secara tertulis oleh kedua belah pihak

DEMIKIAN PERJANJIAN INI DIBUAT DENGAN SEBENARNYA DAN DITANDATANGANI OLEH KEDUA BELAH PIHAK

_________________, _________________
Pemberi Kerja,                  Pekerja,

(_________________)             (_________________)`,
  },
  2: {
    name: 'Surat Perjanjian Kerjasama',
    content: `SURAT PERJANJIAN KERJASAMA (AGREEMENT)

Tanggal: _________________

PIHAK-PIHAK YANG TERIKAT:
1. _________________ 
2. _________________

MENGINGAT:
Bahwa pihak-pihak di atas bermaksud untuk melakukan kerjasama dalam bidang _________________ dengan maksud dan tujuan untuk saling menguntungkan dan meningkatkan usaha masing-masing.

PERJANJIAN:
Dengan ini kedua belah pihak sepakat untuk membuat kesepakatan tentang kerjasama sebagai berikut:

I. BENTUK DAN RUANG LINGKUP KERJASAMA
Kerjasama antara kedua belah pihak adalah dalam bentuk: _________________
Dengan ruang lingkup pekerjaan meliputi: _________________

II. JANGKA WAKTU KERJASAMA
- Mulai tanggal: _________________
- Berakhir tanggal: _________________
- Dapat diperpanjang dengan perjanjian tertulis

III. HARGA DAN PEMBAYARAN
- Total nilai kerjasama: Rp. _________________
- Metode pembayaran: _________________
- Jadwal pembayaran: _________________

IV. HAK DAN KEWAJIBAN
Setiap pihak memiliki hak dan kewajiban sebagaimana dimaksud dalam perjanjian ini dan peraturan perundang-undangan yang berlaku.

V. PENYELESAIAN PERSELISIHAN
Segala perselisihan yang timbul dari perjanjian ini akan diselesaikan dengan musyawarah dan mufakat, jika tidak tercapai kesepakatan akan diselesaikan melalui jalur hukum.

Demikian perjanjian ini dibuat untuk dipatuhi dan dilaksanakan oleh kedua belah pihak dengan sepenuh tanggung jawab.

_________________, _________________
Pihak 1                         Pihak 2

(_________________)             (_________________)`,
  },
  3: {
    name: 'MOU (Memorandum of Understanding)',
    content: `MEMORANDUM OF UNDERSTANDING (MOU)

TANGGAL: _________________

PIHAK YANG TERLIBAT:
1. _________________
2. _________________

PEMBUKAAN:
Para pihak di bawah ini:

MEMAHAMI:
Bahwa para pihak berkeinginan untuk melakukan kerjasama dalam bidang: _________________

DENGAN KESEPAKATAN SEBAGAI BERIKUT:

1. TUJUAN KERJASAMA
   Kerjasama ini bertujuan untuk: _________________

2. AREA KERJASAMA
   Area kerjasama mencakup: _________________

3. JANGKA WAKTU
   - Periode berlaku: _________________
   - Tanggal efektif: _________________
   - Dapat diperpanjang dengan perjanjian lanjutan

4. PERANAN MASING-MASING PIHAK
   Pihak 1 bertugas: _________________
   Pihak 2 bertugas: _________________

5. SIFAT MOU
   MOU ini bersifat non-binding dan merupakan langkah awal menuju perjanjian yang lebih komprehensif.

6. KOMITMEN
   Para pihak berkomitmen untuk:
   a. Bekerja sama dengan itikad baik
   b. Menjaga kerahasiaan informasi yang diperoleh
   c. Menghormati hak dan kewajiban masing-masing

Demikian MOU ini dibuat dengan sukarela sebagai bukti komitmen kedua belah pihak.

_________________, _________________
Pihak 1                         Pihak 2

(_________________)             (_________________)`,
  },
  4: {
    name: 'Sertifikat Penghargaan',
    content: `═══════════════════════════════════════════════════════════════
                    SERTIFIKAT PENGHARGAAN
═══════════════════════════════════════════════════════════════

Dengan hormat kami serahkan kepada:

                    _________________

PENGHARGAAN ATAS:
                    _________________

Telah menunjukkan dedikasi dan prestasi yang luar biasa dalam:

                    _________________

Diberikan pada tanggal: _________________

Semoga pencapaian ini menjadi motivasi untuk terus berkembang dan memberikan yang terbaik bagi organisasi dan masyarakat.

                    ═════════════════════
                    Direktur / Pimpinan

                    (_________________)

Tempat: _________________
Tanggal: _________________`,
  },
  5: {
    name: 'Surat Keterangan Kerja',
    content: `SURAT KETERANGAN KERJA

Nomor: _________________

Yang bertanda tangan di bawah ini:
Nama: _________________
Jabatan: _________________
Perusahaan: _________________

DENGAN INI MENERANGKAN BAHWA:

Nama: _________________
NIK: _________________
Tempat, Tanggal Lahir: _________________
Alamat: _________________

TELAH BEKERJA PADA PERUSAHAAN KAMI DENGAN KETERANGAN SEBAGAI BERIKUT:

1. Posisi/Jabatan: _________________
2. Departemen: _________________
3. Masa Kerja:
   - Mulai tanggal: _________________
   - Berakhir tanggal: _________________
   - Total masa kerja: _________________

4. Alasan Berhenti: _________________

5. Prestasi dan Catatan Kerja:
   _________________________________________________
   _________________________________________________

Surat keterangan ini diberikan untuk keperluan: _________________

Demikian surat keterangan ini dibuat dengan sebenarnya untuk dapat digunakan sebagaimana mestinya.

Hormat kami,

_________________, _________________
Tempat                          Tanggal

(_________________)
Direktur / Pimpinan Perusahaan

Stempel Perusahaan:`,
  },
  6: {
    name: 'Confidentiality Agreement',
    content: `CONFIDENTIALITY AGREEMENT
(PERJANJIAN KERAHASIAAN)

Tanggal: _________________

PIHAK-PIHAK:
1. _________________ (Pemberi Informasi)
2. _________________ (Penerima Informasi)

PEMBUKAAN:
Kedua belah pihak bermaksud untuk berbagi informasi yang bersifat rahasia dan ingin melindungi kerahasiaan informasi tersebut.

KETENTUAN-KETENTUAN:

1. DEFINISI INFORMASI RAHASIA
   Informasi rahasia mencakup:
   - _________________
   - _________________
   - Semua data dan dokumen yang diberikan dalam bentuk tertulis, lisan, atau elektronik

2. KEWAJIBAN PENERIMA INFORMASI
   Penerima Informasi setuju untuk:
   a. Menjaga kerahasiaan semua informasi yang diterima
   b. Tidak mengungkapkan informasi kepada pihak ketiga tanpa persetujuan tertulis
   c. Menggunakan informasi hanya untuk tujuan: _________________

3. DURASI KERAHASIAAN
   Kewajiban kerahasiaan berlaku selama: _________________

4. PENGECUALIAN
   Informasi berikut tidak dianggap rahasia:
   - Informasi yang sudah publik
   - Informasi yang diperoleh dari pihak ketiga secara sah
   - Informasi yang diungkapkan karena perintah pengadilan

5. PENGHENTIAN
   Perjanjian ini berakhir pada: _________________

Demikian perjanjian kerahasiaan ini ditandatangani oleh kedua belah pihak.

_________________, _________________
Pemberi Info                    Penerima Info

(_________________)             (_________________)`,
  },
  7: {
    name: 'Purchase Order (PO)',
    content: `PURCHASE ORDER (PESANAN PEMBELIAN)

NOMOR PO: _________________
TANGGAL PESAN: _________________

INFORMASI PEMBELI:
Nama Perusahaan: _________________
Alamat: _________________
Telepon: _________________
Email: _________________
Nama Pembeli: _________________

INFORMASI SUPPLIER:
Nama Supplier: _________________
Alamat: _________________
Telepon: _________________
Email: _________________
Nomor Rekening: _________________

DETAIL PESANAN:

No. | Deskripsi Barang | Qty | Satuan | Harga Satuan | Total
─────────────────────────────────────────────────────────────
 1. | _________________ | ___ | _____ | ____________ | ______
 2. | _________________ | ___ | _____ | ____________ | ______
 3. | _________________ | ___ | _____ | ____________ | ______

RINGKASAN:
- Subtotal: Rp. _________________
- Pajak (PPN): Rp. _________________
- TOTAL PESANAN: Rp. _________________

PERSYARATAN PEMBAYARAN:
- Metode Pembayaran: _________________
- Tanggal Pembayaran: _________________
- Jatuh Tempo: _________________

PERSYARATAN PENGIRIMAN:
- Tanggal Pengiriman Target: _________________
- Tempat Pengiriman: _________________
- Biaya Pengiriman: _________________

CATATAN KHUSUS:
_________________________________________________

Pesanan ini sah apabila ditandatangani oleh pihak pembeli dan disetujui oleh supplier.

_________________, _________________
Pembeli                         Supplier

(_________________)             (_________________)`,
  },
  8: {
    name: 'Invoice / Faktur',
    content: `INVOICE / FAKTUR

NOMOR INVOICE: _________________
TANGGAL INVOICE: _________________
JATUH TEMPO: _________________

DATA PENYEDIA JASA/BARANG:
Nama Perusahaan: _________________
Alamat: _________________
Telepon: _________________
Email: _________________
NPWP: _________________

DATA PENERIMA JASA/BARANG:
Nama Klien: _________________
Alamat: _________________
Telepon: _________________
Email: _________________

DESKRIPSI PEKERJAAN/BARANG:
_________________________________________________

DETAIL TAGIHAN:

No. | Keterangan | Jumlah | Harga Satuan | Jumlah
──────────────────────────────────────────────────
 1. | _________________ | ___ | __________ | ______
 2. | _________________ | ___ | __________ | ______

RINGKASAN BIAYA:
- Subtotal: Rp. _________________
- Pajak (PPN): Rp. _________________
- Potongan: Rp. _________________
- TOTAL TAGIHAN: Rp. _________________

METODE PEMBAYARAN:
Bank: _________________
Atas Nama: _________________
Nomor Rekening: _________________

CATATAN:
_________________________________________________

Pembayaran harus dilakukan sebelum tanggal jatuh tempo yang telah ditetapkan.

_________________, _________________
Tempat                          Tanggal

(_________________)
Penyedia Jasa/Barang

Stempel Perusahaan:`,
  },
};

export default function TemplateDetailPage() {
  const params = useParams();
  const templateId = Number(params.id);
  const template = templates[templateId];

  if (!template) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Template tidak ditemukan</p>
          <Link href="/dashboard/templates">
            <Button>Kembali ke Template</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([template.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${template.name}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{template.name}</h2>
            <p className="text-muted-foreground mt-1">Preview Template Dokumen</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleDownload}
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Template
            </Button>
            <Link href={`/dashboard/generate?template=${templateId}`}>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Gunakan Template
              </Button>
            </Link>
          </div>
        </div>

        {/* Preview */}
        <Card className="p-8 border-0 shadow-sm">
          <div className="prose prose-invert max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-foreground bg-muted/50 p-6 rounded-lg border border-border overflow-auto">
              {template.content}
            </pre>
          </div>
        </Card>

        {/* Info */}
        <Card className="p-6 border-0 shadow-sm bg-secondary/10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">Cara Menggunakan</h4>
              <p className="text-sm text-muted-foreground">
                Klik tombol "Gunakan Template" untuk membuat dokumen baru. Anda dapat mengisi data secara manual atau memilih klien dari daftar yang ada. Sistem akan secara otomatis mengisi bagian-bagian yang sesuai dengan data klien.
              </p>
            </div>
          </div>
        </Card>

        {/* Back Button */}
        <Link href="/dashboard/templates">
          <Button variant="outline">← Kembali ke Template</Button>
        </Link>
      </div>
    </DashboardLayout>
  );
}
