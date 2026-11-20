
import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Role, RoleRequest } from '../../core/models/role.model';
import { RoleService } from '../../core/services/role.service';

type FormMode = 'create' | 'edit' | 'delete';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './roles.html',
  styleUrl: './roles.scss'
})

export class Roles implements OnInit {

  roles: Role[] = [];

  showForm = false;
  formMode: FormMode = 'create';

  roleId = '';
  roleName = '';

  errorMessage = '';
  successMessage = '';

  isLoading = false;
  isSubmitting = false;

  constructor(private roleService: RoleService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  get submitText(): string {
    if (this.formMode === 'edit') return 'Update';
    if (this.formMode === 'delete') return 'Delete';
    return 'Save';
  }

  // GET ALL ROLES
  loadRoles(): void {
  this.isLoading = true;
  this.errorMessage = '';

  this.roleService.getAllRoles().subscribe({
    next: response => {
      this.roles = response || [];
      this.isLoading = false;
      this.cdr.detectChanges();
    },
    error: error => {
      console.error('Error loading roles:', error);
      this.errorMessage =
        error.error?.message || 'Unable to load roles.';
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  });
}

  // ADD NEW
  openCreateForm(): void {
    this.formMode = 'create';
    this.roleId = '';
    this.roleName = '';
    this.errorMessage = '';
    this.successMessage = '';
    this.showForm = true;
  }

  // EDIT
  openEditForm(role: Role): void {
    this.formMode = 'edit';
    this.roleId = role.id;
    this.roleName = role.name;
    this.errorMessage = '';
    this.successMessage = '';
    this.showForm = true;

    this.roleService.getRoleById(role.id).subscribe({
      next: (response) => {
        this.roleName = response.name;
      },
      error: (error) => {
        console.error('Get Role By ID Error:', error);
        this.errorMessage =
          error.error?.message || 'Unable to load role details.';
      }
    });
  }

  // DELETE FORM
  openDeleteForm(role: Role): void {
    this.formMode = 'delete';
    this.roleId = role.id;
    this.roleName = role.name;
    this.errorMessage = '';
    this.successMessage = '';
    this.showForm = true;
  }

  // CLOSE FORM
  closeForm(): void {
    this.showForm = false;
    this.roleId = '';
    this.roleName = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  // CREATE / UPDATE / DELETE
  submitForm(): void {

    if (this.isSubmitting) return;

    if (this.formMode !== 'delete' && !this.roleName.trim()) {
      this.errorMessage = 'Role name cannot be empty.';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;

    const request: RoleRequest = {
      name: this.roleName.trim()
    };

    if (this.formMode === 'create') {

      this.roleService.createRole(request).subscribe({
        next: (response) => {
          this.successMessage = 'Role created successfully.';
          this.finishOperation();
        },
        error: (error) => {
          this.handleApiError(error, 'Unable to create role.');
        }
      });

    } else if (this.formMode === 'edit') {

      this.roleService.updateRole(this.roleId, request).subscribe({
        next: (response) => {
          this.successMessage = 'Role updated successfully.';
          this.finishOperation();
        },
        error: (error) => {
          this.handleApiError(error, 'Unable to update role.');
        }
      });

    } else if (this.formMode === 'delete') {

      this.roleService.deleteRole(this.roleId).subscribe({
        next: () => {
          this.successMessage = 'Role deleted successfully.';
          this.finishOperation();
        },
        error: (error) => {
          this.handleApiError(error, 'Unable to delete role.');
        }
      });
    }
  }

  // SUCCESS HANDLING
  private finishOperation(): void {
    this.isSubmitting = false;
    this.showForm = false;
    this.roleId = '';
    this.roleName = '';

    this.loadRoles();
  }

  // ERROR HANDLING
  private handleApiError(error: any, defaultMessage: string): void {
    console.error('Role API Error:', error);

    if (error.status === 403) {
      this.errorMessage =
        'Access denied. You do not have permission to perform this action.';
    } else if (error.status === 401) {
      this.errorMessage =
        'Session expired. Please login again.';
    } else {
      this.errorMessage =
        error.error?.message || defaultMessage;
    }

    this.isSubmitting = false;
  }
}
