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

interface ArchivedDocument {
  id: number;
  name: string;
  description: string;
  client?: string;
  fileType: string;
  fileSize: string;
  uploadDate: string;
  startDate?: string;
  endDate?: string;
  status: 'draft' | 'active' | 'expired' | 'completed';
  notes?: string;
}

export default function ArchivesPage() {
  const [documents, setDocuments] = useState<ArchivedDocument[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<ArchivedDocument | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showClientSuggestions, setShowClientSuggestions] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    description: '',
    client: '',
    fileType: 'PDF',
    status: 'draft' as const,
    startDate: '',
    endDate: '',
    notes: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filterTemplate, setFilterTemplate] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('generated_documents');
    if (saved) {
      const docs = JSON.parse(saved);
      setDocuments(docs);
    } else {
      // Initialize with dummy data
      const dummyDocs: ArchivedDocument[] = [
        {
          id: 1,
          name: 'Kontrak Kerja PT Maju Jaya',
          description: 'Kontrak kerja Budi Santoso dengan PT Maju Jaya',
          client: 'PT Maju Jaya',
          fileType: 'PDF',
          fileSize: '2.4 MB',
          uploadDate: '2024-01-10T10:30:00',
          startDate: '2024-01-10',
          endDate: '2025-01-10',
          status: 'active',
          notes: 'Dokumen sudah ditanda tangani oleh kedua pihak'
        },
        {
          id: 2,
          name: 'MOU Kerjasama PT Bersama',
          description: 'Memorandum of Understanding antara PT Maju Jaya dan PT Bersama',
          client: 'PT Bersama',
          fileType: 'PDF',
          fileSize: '1.8 MB',
          uploadDate: '2024-02-05T14:15:00',
          startDate: '2024-02-05',
          endDate: '2024-02-05',
          status: 'completed',
          notes: 'Perjanjian kerjasama telah selesai'
        },
        {
          id: 3,
          name: 'Surat Perjanjian CV Sukses',
          description: 'Surat perjanjian kerjasama dengan CV Sukses',
          client: 'CV Sukses',
          fileType: 'PDF',
          fileSize: '1.5 MB',
          uploadDate: '2023-12-15T09:00:00',
          startDate: '2023-12-15',
          endDate: '2023-12-31',
          status: 'expired',
          notes: 'Perjanjian sudah berakhir'
        },
        {
          id: 4,
          name: 'Sertifikat Penghargaan Ahmad Wijaya',
          description: 'Sertifikat penghargaan karyawan terbaik tahun 2024',
          client: 'CV Sukses',
          fileType: 'PDF',
          fileSize: '0.8 MB',
          uploadDate: '2024-01-20T11:45:00',
          status: 'completed',
          notes: 'Sertifikat sudah diberikan ke penerima'
        },
        {
          id: 5,
          name: 'Surat Keterangan Kerja Rina Kusuma',
          description: 'Surat keterangan kerja untuk Rina Kusuma',
          client: 'PT Indo Global',
          fileType: 'PDF',
          fileSize: '0.6 MB',
          uploadDate: '2024-02-10T13:20:00',
          status: 'draft',
          notes: 'Masih dalam tahap persiapan, menunggu tanda tangan'
        },
        {
          id: 6,
          name: 'Confidentiality Agreement PT Maju Jaya',
          description: 'Perjanjian kerahasiaan dengan PT Maju Jaya',
          client: 'PT Maju Jaya',
          fileType: 'PDF',
          fileSize: '1.2 MB',
          uploadDate: '2024-01-25T16:30:00',
          startDate: '2024-01-25',
          endDate: '2025-01-25',
          status: 'active',
          notes: 'Dokumen berlaku selama periode kontrak'
        },
        {
          id: 7,
          name: 'Purchase Order No. 2024-001',
          description: 'Purchase Order untuk pembelian barang dari supplier',
          fileType: 'PDF',
          fileSize: '0.9 MB',
          uploadDate: '2024-01-15T10:00:00',
          status: 'completed',
          notes: 'Order sudah diterima dan selesai'
        },
        {
          id: 8,
          name: 'Invoice Pelayanan Januari 2024',
          description: 'Invoice untuk pelayanan bulan Januari 2024',
          client: 'PT Indo Global',
          fileType: 'PDF',
          fileSize: '0.7 MB',
          uploadDate: '2024-02-01T15:45:00',
          status: 'active',
          notes: 'Invoice sudah dikirim ke klien'
        }
      ];
      setDocuments(dummyDocs);
      localStorage.setItem('generated_documents', JSON.stringify(dummyDocs));
    }
  }, []);

  // Load clients from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('clients');
    if (saved) {
      setClients(JSON.parse(saved));
    }
  }, []);

  const filteredDocuments = documents.filter(doc => {
    return doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           doc.client?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const suggestedClients = uploadForm.client.trim() 
    ? clients.filter(c => 
        c.company.toLowerCase().includes(uploadForm.client.toLowerCase()) ||
        c.name.toLowerCase().includes(uploadForm.client.toLowerCase())
      )
    : [];

  const handleSelectClient = (client: Client) => {
    setUploadForm({
      ...uploadForm,
      client: client.company
    });
    setShowClientSuggestions(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowClientSuggestions(false);
    if (showClientSuggestions) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showClientSuggestions]);

  const handleDelete = (id: number) => {
    const updated = documents.filter(d => d.id !== id);
    setDocuments(updated);
    localStorage.setItem('generated_documents', JSON.stringify(updated));
    setSelectedDoc(null);
  };

  const handleDownload = (doc: ArchivedDocument) => {
    const element = document.createElement('a');
    const file = new Blob([doc.notes || ''], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${doc.name}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = (doc: ArchivedDocument) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write('<html><head><title>' + doc.name + '</title></head><body>');
      printWindow.document.write('<pre style="font-family: monospace; white-space: pre-wrap;">' + (doc.notes || '') + '</pre>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 100);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Auto-fill nama dokumen jika kosong
      if (!uploadForm.name.trim()) {
        const fileName = file.name.replace(/\.[^.]*$/, '');
        setUploadForm({ ...uploadForm, name: fileName });
      }
      // Auto-detect file type
      const extension = file.name.split('.').pop()?.toUpperCase() || 'PDF';
      if (['PDF', 'DOC', 'DOCX', 'XLS', 'XLSX'].includes(extension)) {
        setUploadForm({ ...uploadForm, fileType: extension });
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      if (!uploadForm.name.trim()) {
        const fileName = file.name.replace(/\.[^.]*$/, '');
        setUploadForm({ ...uploadForm, name: fileName });
      }
      const extension = file.name.split('.').pop()?.toUpperCase() || 'PDF';
      if (['PDF', 'DOC', 'DOCX', 'XLS', 'XLSX'].includes(extension)) {
        setUploadForm({ ...uploadForm, fileType: extension });
      }
    }
  };

  const handleUpload = () => {
    if (!uploadForm.name.trim()) {
      alert('Nama dokumen harus diisi');
      return;
    }

    if (!selectedFile) {
      alert('Silakan pilih file untuk diupload');
      return;
    }

    const newDoc: ArchivedDocument = {
      id: Math.max(0, ...documents.map(d => d.id)) + 1,
      name: uploadForm.name,
      description: uploadForm.description,
      client: uploadForm.client || undefined,
      fileType: selectedFile.name.split('.').pop()?.toUpperCase() || uploadForm.fileType,
      fileSize: formatFileSize(selectedFile.size),
      uploadDate: new Date().toISOString(),
      startDate: uploadForm.startDate || undefined,
      endDate: uploadForm.endDate || undefined,
      status: uploadForm.status,
      notes: uploadForm.notes || undefined
    };

    const updated = [...documents, newDoc];
    setDocuments(updated);
    localStorage.setItem('generated_documents', JSON.stringify(updated));
    
    // Reset form
    setUploadForm({
      name: '',
      description: '',
      client: '',
      fileType: 'PDF',
      status: 'draft',
      startDate: '',
      endDate: '',
      notes: ''
    });
    setSelectedFile(null);
    setShowUploadForm(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: { [key: string]: { bg: string; text: string; label: string } } = {
      draft: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-700 dark:text-gray-300', label: 'Draft' },
      active: { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-700 dark:text-green-300', label: 'Aktif' },
      expired: { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-700 dark:text-red-300', label: 'Kadaluarsa' },
      completed: { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-700 dark:text-blue-300', label: 'Selesai' }
    };
    const config = statusConfig[status] || statusConfig.draft;
    return { ...config };
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Arsip Dokumen</h2>
            <p className="text-muted-foreground">Total: {documents.length} dokumen</p>
          </div>
          <Button
            onClick={() => setShowUploadForm(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Upload Dokumen
          </Button>
        </div>

        {/* Upload Form Modal */}
        {showUploadForm && (
          <Card className="border-0 shadow-sm p-6 bg-muted/30 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Upload Dokumen Baru</h3>
              <button
                onClick={() => setShowUploadForm(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nama Dokumen *</label>
                <Input
                  placeholder="Contoh: Kontrak Kerja PT Maju Jaya"
                  value={uploadForm.name}
                  onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tipe File</label>
                <select
                  value={uploadForm.fileType}
                  onChange={(e) => setUploadForm({ ...uploadForm, fileType: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm"
                >
                  <option>PDF</option>
                  <option>DOC</option>
                  <option>DOCX</option>
                  <option>XLS</option>
                  <option>XLSX</option>
                  <option>Lainnya</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Deskripsi</label>
                <textarea
                  placeholder="Deskripsi singkat tentang dokumen ini..."
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm resize-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Pilih File *</label>
                <div className="relative">
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileSelect}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.png,.jpg,.jpeg"
                  />
                  <label
                    htmlFor="file-upload"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-border rounded-lg bg-muted/30 cursor-pointer hover:border-primary hover:bg-muted/50 transition-colors"
                  >
                    <div className="text-center">
                      <svg className="w-8 h-8 mx-auto text-muted-foreground mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="text-sm font-medium text-foreground mb-1">Klik untuk memilih file atau drag & drop</p>
                      <p className="text-xs text-muted-foreground">PDF, DOC, DOCX, XLS, XLSX, TXT, PNG, JPG</p>
                    </div>
                  </label>
                </div>
                {selectedFile && (
                  <div className="mt-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{selectedFile.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                      </div>
                      <button
                        onClick={() => setSelectedFile(null)}
                        className="text-xs text-destructive hover:text-destructive/80 font-medium flex-shrink-0"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-foreground mb-2">Klien (Opsional)</label>
                <div className="relative">
                  <Input
                    placeholder="Cari atau pilih klien dari daftar..."
                    value={uploadForm.client}
                    onChange={(e) => {
                      setUploadForm({ ...uploadForm, client: e.target.value });
                      setShowClientSuggestions(true);
                    }}
                    onFocus={() => setShowClientSuggestions(true)}
                  />
                  {showClientSuggestions && suggestedClients.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                      {suggestedClients.map((client) => (
                        <button
                          key={client.id}
                          onClick={() => handleSelectClient(client)}
                          className="w-full text-left px-4 py-2 hover:bg-muted/50 border-b border-border last:border-b-0 transition-colors"
                        >
                          <p className="text-sm font-medium text-foreground">{client.company}</p>
                          <p className="text-xs text-muted-foreground">{client.name} • {client.phone}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select
                  value={uploadForm.status}
                  onChange={(e) => setUploadForm({ ...uploadForm, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Aktif</option>
                  <option value="completed">Selesai</option>
                  <option value="expired">Kadaluarsa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tanggal Mulai (Opsional)</label>
                <Input
                  type="date"
                  value={uploadForm.startDate}
                  onChange={(e) => setUploadForm({ ...uploadForm, startDate: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tanggal Berakhir (Opsional)</label>
                <Input
                  type="date"
                  value={uploadForm.endDate}
                  onChange={(e) => setUploadForm({ ...uploadForm, endDate: e.target.value })}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Catatan (Opsional)</label>
                <textarea
                  placeholder="Catatan tambahan tentang dokumen..."
                  value={uploadForm.notes}
                  onChange={(e) => setUploadForm({ ...uploadForm, notes: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm resize-none"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-4 border-t border-border">
              <Button
                onClick={() => setShowUploadForm(false)}
                variant="outline"
              >
                Batal
              </Button>
              <Button
                onClick={handleUpload}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Upload Dokumen
              </Button>
            </div>
          </Card>
        )}

        {/* Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Cari dokumen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>

        {/* Documents Table */}
        {filteredDocuments.length > 0 ? (
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Nama Dokumen</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Klien</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Tipe File</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Ukuran</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Periode</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredDocuments.map((doc) => {
                    const statusConfig = getStatusBadge(doc.status);
                    return (
                      <tr key={doc.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-foreground">{doc.name}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{doc.client || '-'}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{doc.fileType}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{doc.fileSize}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {doc.startDate && doc.endDate ? (
                            <span>
                              {new Date(doc.startDate).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })} - {new Date(doc.endDate).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          ) : (
                            <span className="text-muted-foreground/60">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex gap-2 justify-center">
                            <Button
                              onClick={() => setSelectedDoc(doc)}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              Detail
                            </Button>
                            <Button
                              onClick={() => handleDownload(doc)}
                              size="sm"
                              className="text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
                            >
                              Download
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <Card className="p-12 text-center border-0 shadow-sm">
            <svg className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <p className="text-muted-foreground mb-4">Tidak ada dokumen yang cocok</p>
            <Button onClick={() => { setSearchTerm(''); setFilterTemplate(''); }}>Reset Filter</Button>
          </Card>
        )}

        {/* Detail Modal/Panel */}
        {selectedDoc && (
          <Card className="border-0 shadow-sm p-6 bg-muted/30">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{selectedDoc.name}</h3>
                {selectedDoc.description && (
                  <p className="text-sm text-muted-foreground mt-1">{selectedDoc.description}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {selectedDoc.client && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Klien</p>
                  <p className="text-sm font-medium text-foreground">{selectedDoc.client}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground mb-1">Tipe File</p>
                <p className="text-sm font-medium text-foreground">{selectedDoc.fileType}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Ukuran File</p>
                <p className="text-sm font-medium text-foreground">{selectedDoc.fileSize}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Tanggal Upload</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(selectedDoc.uploadDate).toLocaleDateString('id-ID')}
                </p>
              </div>
              {selectedDoc.startDate && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Mulai Berlaku</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(selectedDoc.startDate).toLocaleDateString('id-ID')}
                  </p>
                </div>
              )}
              {selectedDoc.endDate && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Berakhir</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(selectedDoc.endDate).toLocaleDateString('id-ID')}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2 mb-4">
              <Button
                onClick={() => handleDownload(selectedDoc)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-4a3 3 0 00-3-3H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Download
              </Button>
              <Button
                onClick={() => handlePrint(selectedDoc)}
                variant="outline"
                className="text-sm"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Cetak
              </Button>
              <Button
                onClick={() => {
                  handleDelete(selectedDoc.id);
                  setSelectedDoc(null);
                }}
                variant="outline"
                className="text-destructive hover:bg-destructive/10 border-destructive/20 text-sm"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Hapus
              </Button>
            </div>

            {selectedDoc.notes && (
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2 font-medium">Catatan</p>
                <p className="text-sm text-foreground bg-background p-3 rounded-lg border border-border">
                  {selectedDoc.notes}
                </p>
              </div>
            )}
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
