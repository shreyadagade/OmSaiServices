import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})

export class AdminLayout {
  userName = sessionStorage.getItem('userName') || 'Admin';

  userRoles: string[] = this.getRoles();

  isAdministrator = this.userRoles.some(
    role => role.toLowerCase() === 'administrator'
  );

  constructor(private router: Router) {}

  private getRoles(): string[] {
    const savedRoles = sessionStorage.getItem('userRoles');

    if (!savedRoles) {
      return [];
    }

    try {
      const roles = JSON.parse(savedRoles);
      return Array.isArray(roles) ? roles : [String(roles)];
    } catch {
      return [savedRoles];
    }
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/account/login']);
  }

    profileOpen = false;
    menuOpen = false;
    activeDropdown = '';

toggleDropdown(name: string): void {
  this.activeDropdown =
    this.activeDropdown === name ? '' : name;
}
}