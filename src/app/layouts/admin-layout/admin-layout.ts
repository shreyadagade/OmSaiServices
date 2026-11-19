
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { LogoutService } from '../../core/services/logout.service';

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

  // Layout UI controls
  profileOpen = false;
  menuOpen = false;
  activeDropdown = '';

  // Logout button state
  isLoggingOut = false;

  constructor(
    private router: Router,
    private logoutService: LogoutService
  ) {}

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

  toggleDropdown(name: string): void {
    this.activeDropdown =
      this.activeDropdown === name ? '' : name;
  }

  logout(): void {
    if (this.isLoggingOut) return;

    this.isLoggingOut = true;

    this.logoutService.logout().subscribe({
      next: (response) => {
        console.log('Logout:', response.message);
        this.finishLogout();
      },
      error: (error) => {
        console.error('Logout API Error:', error);
        this.finishLogout();
      }
    });
  }

  private finishLogout(): void {
    this.profileOpen = false;
    this.isLoggingOut = false;
    this.router.navigateByUrl('/account/login');
  }
}
