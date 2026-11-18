
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface DocumentItem {
  id: number;
  name: string;
  isDocumentImage: boolean;
  isDocumentNumber: boolean;
  status: boolean;
}

type FormMode = 'create' | 'edit';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './documents.html',
  styleUrl: './documents.scss'
})
export class Documents {
  documents: DocumentItem[] = [
    { id: 1, name: 'Passport Size Photo', isDocumentImage: true, isDocumentNumber: false, status: true },
    { id: 2, name: 'Aadhar Card', isDocumentImage: true, isDocumentNumber: true, status: true },
    { id: 3, name: 'PAN Card', isDocumentImage: true, isDocumentNumber: true, status: true },
    { id: 4, name: 'Education Proof', isDocumentImage: true, isDocumentNumber: false, status: true },
    { id: 5, name: 'Signature', isDocumentImage: true, isDocumentNumber: false, status: true },
    { id: 6, name: 'Left Thumb Scan', isDocumentImage: true, isDocumentNumber: false, status: true },
    { id: 7, name: 'Right Thumb Scan', isDocumentImage: true, isDocumentNumber: false, status: true },
    { id: 8, name: 'Old PF/UAN Number', isDocumentImage: false, isDocumentNumber: true, status: true },
    { id: 9, name: 'Old ESIC Number', isDocumentImage: false, isDocumentNumber: true, status: true },
    { id: 10, name: 'Current Salary', isDocumentImage: false, isDocumentNumber: true, status: true },
    { id: 11, name: 'Joining Form Scan Copy', isDocumentImage: true, isDocumentNumber: false, status: true },
    { id: 12, name: 'string', isDocumentImage: true, isDocumentNumber: true, status: true },
    { id: 13, name: 'string', isDocumentImage: true, isDocumentNumber: true, status: true },
    { id: 14, name: 'PAN No.', isDocumentImage: true, isDocumentNumber: true, status: true },
    { id: 15, name: 'PAN No.', isDocumentImage: false, isDocumentNumber: true, status: true },
    { id: 16, name: 'PAN No.', isDocumentImage: false, isDocumentNumber: true, status: true }
  ];

  showForm = false;
  formMode: FormMode = 'create';

  documentId: number | null = null;
  documentName = '';
  isDocumentImage = true;
  isDocumentNumber = true;
  status = true;
  errorMessage = '';

  showDeleteModal = false;
  deleteId: number | null = null;
  deleteDisplay = '';

  openCreateForm(): void {
    this.formMode = 'create';
    this.documentId = null;
    this.documentName = '';
    this.isDocumentImage = true;
    this.isDocumentNumber = true;
    this.status = true;
    this.errorMessage = '';
    this.showForm = true;
  }

  openEditForm(item: DocumentItem): void {
    this.formMode = 'edit';
    this.documentId = item.id;
    this.documentName = item.name;
    this.isDocumentImage = item.isDocumentImage;
    this.isDocumentNumber = item.isDocumentNumber;
    this.status = item.status;
    this.errorMessage = '';
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.errorMessage = '';
  }

  saveDocument(): void {
    if (!this.documentName.trim()) {
      this.errorMessage = 'Document Name is required.';
      return;
    }

    if (this.formMode === 'create') {
      const nextId = Math.max(0, ...this.documents.map(item => item.id)) + 1;

      this.documents.push({
        id: nextId,
        name: this.documentName.trim(),
        isDocumentImage: this.isDocumentImage,
        isDocumentNumber: this.isDocumentNumber,
        status: this.status
      });
    } else if (this.documentId !== null) {
      const item = this.documents.find(doc => doc.id === this.documentId);

      if (item) {
        item.name = this.documentName.trim();
        item.isDocumentImage = this.isDocumentImage;
        item.isDocumentNumber = this.isDocumentNumber;
        item.status = this.status;
      }
    }

    this.closeForm();
  }

  openDeleteModal(item: DocumentItem): void {
    this.deleteId = item.id;
    this.deleteDisplay = item.name;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.deleteId = null;
    this.deleteDisplay = '';
  }

  confirmDelete(): void {
    if (this.deleteId === null) return;

    this.documents = this.documents.filter(item => item.id !== this.deleteId);
    this.closeDeleteModal();
  }
}
