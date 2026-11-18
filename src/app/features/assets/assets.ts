
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Asset {
  id: number;
  name: string;
  status: boolean;
}

type FormMode = 'create' | 'edit' | 'delete';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './assets.html',
  styleUrl: './assets.scss'
})
export class Assets {
  assets: Asset[] = [
    { id: 1, name: 'Shirt', status: true },
    { id: 2, name: 'Pant', status: true },
    { id: 3, name: 'Cap', status: true },
    { id: 4, name: 'Belt', status: true },
    { id: 5, name: 'Lineyard', status: true },
    { id: 6, name: 'Whistle', status: true },
    { id: 7, name: 'Tw Logo', status: true },
    { id: 8, name: 'Stick', status: true },
    { id: 9, name: 'Jacket', status: true },
    { id: 10, name: 'FULL UNIFORM', status: true },
    { id: 11, name: 'Laptop', status: true },
    { id: 12, name: 'Laptop', status: true },
    { id: 13, name: 'car', status: false }
  ];

  showForm = false;
  formMode: FormMode = 'create';

  assetId: number | null = null;
  assetName = '';
  status = true;
  errorMessage = '';

  get submitButtonText(): string {
    if (this.formMode === 'edit') return 'Update';
    if (this.formMode === 'delete') return 'Delete';
    return 'Save';
  }

  openCreateForm(): void {
    this.formMode = 'create';
    this.assetId = null;
    this.assetName = '';
    this.status = true;
    this.errorMessage = '';
    this.showForm = true;
  }

  openEditForm(asset: Asset): void {
    this.formMode = 'edit';
    this.assetId = asset.id;
    this.assetName = asset.name;
    this.status = asset.status;
    this.errorMessage = '';
    this.showForm = true;
  }

  openDeleteForm(asset: Asset): void {
    this.formMode = 'delete';
    this.assetId = asset.id;
    this.assetName = asset.name;
    this.status = asset.status;
    this.errorMessage = '';
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.assetId = null;
    this.assetName = '';
    this.errorMessage = '';
  }

  submitForm(): void {
    if (this.formMode === 'delete') {
      if (this.assetId !== null) {
        this.assets = this.assets.filter(
          item => item.id !== this.assetId
        );
      }

      this.closeForm();
      return;
    }

    if (!this.assetName.trim()) {
      this.errorMessage = 'Asset Name is required.';
      return;
    }

    if (this.formMode === 'create') {
      const nextId = Math.max(
        0,
        ...this.assets.map(item => item.id)
      ) + 1;

      this.assets.push({
        id: nextId,
        name: this.assetName.trim(),
        status: this.status
      });
    } else if (this.assetId !== null) {
      const asset = this.assets.find(
        item => item.id === this.assetId
      );

      if (asset) {
        asset.name = this.assetName.trim();
        asset.status = this.status;
      }
    }

    this.closeForm();
  }
}
