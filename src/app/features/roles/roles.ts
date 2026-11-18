
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterLink } from '@angular/router';

// interface Role {
//   id: number;
//   name: string;
// }

// @Component({
//   selector: 'app-roles',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterLink],
//   templateUrl: './roles.html',
//   styleUrl: './roles.scss'
// })
// export class Roles {

//   roles: Role[] = [
//     { id: 1, name: 'Field Officer' },
//     { id: 2, name: 'NITIN WAGHMARE' },
//     { id: 3, name: 'Manager' },
//     { id: 4, name: 'MD' },
//     { id: 5, name: 'Superviser' },
//     { id: 6, name: 'Staff' },
//     { id: 7, name: 'Manager_1' },
//     { id: 8, name: 'Administrator' },
//     { id: 9, name: 'Manager_2' }
//   ];

//   showForm = false;
//   isEditMode = false;

//   roleId: number | null = null;
//   roleName = '';

//   private nextId = 10;

//   // Add New
//   openAddForm(): void {
//     this.showForm = true;
//     this.isEditMode = false;
//     this.roleId = null;
//     this.roleName = '';
//   }

//   // Edit
//   editRole(role: Role): void {
//     this.showForm = true;
//     this.isEditMode = true;
//     this.roleId = role.id;
//     this.roleName = role.name;
//   }

//   // Save
//   saveRole(): void {
//     const name = this.roleName.trim();

//     if (!name) {
//       return;
//     }

//     if (this.isEditMode && this.roleId !== null) {
//       const role = this.roles.find(r => r.id === this.roleId);

//       if (role) {
//         role.name = name;
//       }
//     } else {
//       this.roles.push({
//         id: this.nextId++,
//         name: name
//       });
//     }

//     this.closeForm();
//   }

//   // Cancel
//   closeForm(): void {
//     this.showForm = false;
//     this.isEditMode = false;
//     this.roleId = null;
//     this.roleName = '';
//   }

//   // Delete
//   deleteRole(role: Role): void {
//     const confirmed = window.confirm(
//       `Are you sure you want to delete ${role.name}?`
//     );

//     if (confirmed) {
//       this.roles = this.roles.filter(r => r.id !== role.id);
//     }
//   }
// }



import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Role {
  id: string;
  name: string;
}

type FormMode = 'create' | 'edit' | 'delete';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './roles.html',
  styleUrl: './roles.scss'
})
export class Roles {
  roles: Role[] = [];

  showForm = false;
  formMode: FormMode = 'create';

  roleId = '';
  roleName = '';
  errorMessage = '';

  get submitText(): string {
    if (this.formMode === 'edit') return 'Update';
    if (this.formMode === 'delete') return 'Delete';
    return 'Save';
  }

  openCreateForm(): void {
    this.formMode = 'create';
    this.roleId = '';
    this.roleName = '';
    this.errorMessage = '';
    this.showForm = true;
  }

  openEditForm(role: Role): void {
    this.formMode = 'edit';
    this.roleId = role.id;
    this.roleName = role.name;
    this.errorMessage = '';
    this.showForm = true;
  }

  openDeleteForm(role: Role): void {
    this.formMode = 'delete';
    this.roleId = role.id;
    this.roleName = role.name;
    this.errorMessage = '';
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.roleId = '';
    this.roleName = '';
    this.errorMessage = '';
  }

  submitForm(): void {
    if (this.formMode !== 'delete' && !this.roleName.trim()) {
      this.errorMessage = 'Role name cannot be empty.';
      return;
    }

    if (this.formMode === 'create') {
      this.roles.push({
        id: crypto.randomUUID(),
        name: this.roleName.trim()
      });
    }

    if (this.formMode === 'edit') {
      const role = this.roles.find(item => item.id === this.roleId);
      if (role) {
        role.name = this.roleName.trim();
      }
    }

    if (this.formMode === 'delete') {
      this.roles = this.roles.filter(item => item.id !== this.roleId);
    }

    this.closeForm();
  }
}
