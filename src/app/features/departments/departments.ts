
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Department {
  id: number;
  name: string;
  shortName: string;
  status: boolean;
}

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './departments.html',
  styleUrl: './departments.scss'
})
export class Departments {
  departments: Department[] = [
    { id: 1, name: 'Security', shortName: 'SECR', status: true },
    { id: 2, name: 'Bouncer', shortName: 'BOU', status: true },
    { id: 3, name: 'Office Staff', shortName: 'OS', status: true },
    { id: 4, name: 'Traffic Warden', shortName: 'TW', status: true },
    { id: 5, name: 'Traffic Marshal', shortName: 'TM', status: true },
    { id: 6, name: 'Peon', shortName: 'PE', status: true },
    { id: 7, name: 'House Keeping', shortName: 'HK', status: true },
    { id: 8, name: 'Supervisor', shortName: 'SUP', status: true },
    { id: 9, name: 'SRPF', shortName: 'SF', status: true },
    { id: 10, name: 'Managment', shortName: 'MD', status: true },
    { id: 11, name: 'Field Officer', shortName: 'FO', status: true }
  ];

  showForm = false;
  isEdit = false;

  departmentId: number | null = null;
  departmentName = '';
  departmentShortName = '';
  status = true;
  errorMessage = '';

  showDeleteModal = false;
  deleteId: number | null = null;
  deleteDisplay = '';

  openCreateForm(): void {
    this.isEdit = false;
    this.departmentId = null;
    this.departmentName = '';
    this.departmentShortName = '';
    this.status = true;
    this.errorMessage = '';
    this.showForm = true;
  }

  openEditForm(item: Department): void {
    this.isEdit = true;
    this.departmentId = item.id;
    this.departmentName = item.name;
    this.departmentShortName = item.shortName;
    this.status = item.status;
    this.errorMessage = '';
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.errorMessage = '';
  }

  saveDepartment(): void {
    if (!this.departmentName.trim() || !this.departmentShortName.trim()) {
      this.errorMessage = 'Please enter Department Name and Department Short Name.';
      return;
    }

    if (this.isEdit && this.departmentId !== null) {
      const item = this.departments.find(d => d.id === this.departmentId);

      if (item) {
        item.name = this.departmentName.trim();
        item.shortName = this.departmentShortName.trim();
        item.status = this.status;
      }
    } else {
      const nextId = Math.max(0, ...this.departments.map(d => d.id)) + 1;

      this.departments.push({
        id: nextId,
        name: this.departmentName.trim(),
        shortName: this.departmentShortName.trim(),
        status: this.status
      });
    }

    this.closeForm();
  }

  openDeleteModal(item: Department): void {
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

    this.departments = this.departments.filter(
      d => d.id !== this.deleteId
    );

    this.closeDeleteModal();
  }
}
