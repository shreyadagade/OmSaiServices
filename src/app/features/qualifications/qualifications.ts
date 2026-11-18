
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Qualification {
  id: number;
  name: string;
  status: boolean;
}

type FormMode = 'create' | 'edit' | 'delete';

@Component({
  selector: 'app-qualifications',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './qualifications.html',
  styleUrl: './qualifications.scss'
})
export class Qualifications {
  qualifications: Qualification[] = [
    { id: 1, name: 'SSC', status: true },
    { id: 2, name: 'HSC', status: true },
    { id: 3, name: 'Diploma', status: true },
    { id: 4, name: 'Graduation', status: true },
    { id: 5, name: 'Post Graduation', status: true },
    { id: 6, name: '8 th standard', status: true },
    { id: 7, name: 'BCA', status: true },
    { id: 8, name: 'HSC', status: true }
  ];

  showForm = false;
  formMode: FormMode = 'create';

  qualificationId: number | null = null;
  qualificationName = '';
  status = true;
  errorMessage = '';

  openCreateForm(): void {
    this.formMode = 'create';
    this.qualificationId = null;
    this.qualificationName = '';
    this.status = true;
    this.errorMessage = '';
    this.showForm = true;
  }

  openEditForm(item: Qualification): void {
    this.formMode = 'edit';
    this.qualificationId = item.id;
    this.qualificationName = item.name;
    this.status = item.status;
    this.errorMessage = '';
    this.showForm = true;
  }

  openDeleteForm(item: Qualification): void {
    this.formMode = 'delete';
    this.qualificationId = item.id;
    this.qualificationName = '';
    this.status = true;
    this.errorMessage = '';
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.errorMessage = '';
  }

  submitForm(): void {
    if (this.formMode === 'delete') {
      if (this.qualificationId !== null) {
        this.qualifications = this.qualifications.filter(
          item => item.id !== this.qualificationId
        );
      }

      this.closeForm();
      return;
    }

    if (!this.qualificationName.trim()) {
      this.errorMessage = 'Qualification Name is required.';
      return;
    }

    if (this.formMode === 'create') {
      const nextId = Math.max(
        0,
        ...this.qualifications.map(item => item.id)
      ) + 1;

      this.qualifications.push({
        id: nextId,
        name: this.qualificationName.trim(),
        status: this.status
      });
    } else if (this.qualificationId !== null) {
      const item = this.qualifications.find(
        q => q.id === this.qualificationId
      );

      if (item) {
        item.name = this.qualificationName.trim();
        item.status = this.status;
      }
    }

    this.closeForm();
  }

  get submitButtonText(): string {
    if (this.formMode === 'edit') return 'Update';
    if (this.formMode === 'delete') return 'Delete';
    return 'Save';
  }
}
