import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/20 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold text-primary/30 mb-4">404</div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Halaman Tidak Ditemukan</h1>
        <p className="text-muted-foreground mb-6">
          Maaf, halaman yang Anda cari tidak dapat ditemukan.
        </p>
        <Link href="/dashboard">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Kembali ke Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
