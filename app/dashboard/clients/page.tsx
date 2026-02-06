'use client';

import React from "react"

import { useState, useEffect } from 'react';
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
  joinDate: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
  });

  // Load clients from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('clients');
    if (saved) {
      setClients(JSON.parse(saved));
    } else {
      // Initialize with dummy data
      const dummyClients: Client[] = [
        { id: 1, name: 'Budi Santoso', email: 'budi@ptmajujaya.com', phone: '081234567890', company: 'PT Maju Jaya', address: 'Jl. Sudirman No. 123, Jakarta', joinDate: '2023-06-15' },
        { id: 2, name: 'Siti Nurhaliza', email: 'siti@ptbersama.com', phone: '082345678901', company: 'PT Bersama', address: 'Jl. Gatot Subroto No. 456, Bandung', joinDate: '2023-08-20' },
        { id: 3, name: 'Ahmad Wijaya', email: 'ahmad@cvsukses.com', phone: '083456789012', company: 'CV Sukses', address: 'Jl. Ahmad Yani No. 789, Surabaya', joinDate: '2023-10-10' },
        { id: 4, name: 'Rina Kusuma', email: 'rina@ptindo.com', phone: '084567890123', company: 'PT Indo Global', address: 'Jl. Imam Bonjol No. 321, Medan', joinDate: '2024-01-05' },
        { id: 5, name: 'Doni Haryanto', email: 'doni@cvmaju.com', phone: '085678901234', company: 'CV Maju Terus', address: 'Jl. Jend. Sudirman No. 654, Yogyakarta', joinDate: '2024-01-15' },
      ];
      setClients(dummyClients);
      localStorage.setItem('clients', JSON.stringify(dummyClients));
    }
  }, []);

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) return;

    if (editingId) {
      const updated = clients.map(c =>
        c.id === editingId ? { ...c, ...formData } : c
      );
      setClients(updated);
      localStorage.setItem('clients', JSON.stringify(updated));
      setEditingId(null);
    } else {
      const newClient: Client = {
        id: Math.max(...clients.map(c => c.id), 0) + 1,
        ...formData,
        joinDate: new Date().toISOString().split('T')[0],
      };
      const updated = [...clients, newClient];
      setClients(updated);
      localStorage.setItem('clients', JSON.stringify(updated));
    }

    setFormData({ name: '', email: '', phone: '', company: '', address: '' });
    setShowForm(false);
  };

  const handleEdit = (client: Client) => {
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      company: client.company,
      address: client.address,
    });
    setEditingId(client.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    const updated = clients.filter(c => c.id !== id);
    setClients(updated);
    localStorage.setItem('clients', JSON.stringify(updated));
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Daftar Klien</h2>
          <Button
            onClick={() => {
              setFormData({ name: '', email: '', phone: '', company: '', address: '' });
              setEditingId(null);
              setShowForm(!showForm);
            }}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {showForm ? 'Batalkan' : '+ Tambah Klien'}
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <Card className="p-6 border-0 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {editingId ? 'Edit Klien' : 'Tambah Klien Baru'}
            </h3>
            <form onSubmit={handleAddClient} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nama</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Masukkan nama klien"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contoh@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Telepon</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Perusahaan</label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="PT/CV Nama Perusahaan"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Alamat</label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Jalan, Kota, Provinsi"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  {editingId ? 'Simpan Perubahan' : 'Tambah Klien'}
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Search */}
        <div className="flex gap-4">
          <Input
            placeholder="Cari berdasarkan nama, perusahaan, atau email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>

        {/* Clients Table */}
        {filteredClients.length > 0 ? (
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Nama</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Perusahaan</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Telepon</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Bergabung</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{client.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{client.company}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{client.email}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{client.phone}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(client.joinDate).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex gap-2 justify-center">
                          <Button
                            onClick={() => handleEdit(client)}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(client.id)}
                            variant="outline"
                            size="sm"
                            className="text-xs text-destructive hover:bg-destructive/10 border-destructive/20"
                          >
                            Hapus
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <Card className="p-12 text-center border-0 shadow-sm">
            <svg className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 12H9m4 5h4m0 0h4m-4 0v4m0-4v-4m-4 0h-4m4 0v4m0-4v-4" />
            </svg>
            <p className="text-muted-foreground">Tidak ada klien yang cocok dengan pencarian Anda</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
