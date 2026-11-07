
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { LoginRequest } from '../../core/models/login-request.model';
import { LoginResponse } from '../../core/models/login-response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  email: string = '';
  password: string = '';

  rememberMe: boolean = false;
  showPassword: boolean = false;

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService) {}

  onSubmit(): void {

    this.errorMessage = '';

    if (!this.email.trim()) {
      this.errorMessage = 'Please enter your email address.';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    if (!this.password) {
      this.errorMessage = 'Please enter your password.';
      return;
    }

    const loginRequest: LoginRequest = {
      email: this.email.trim(),
      password: this.password
    };

    this.isLoading = true;

    this.authService.login(loginRequest).subscribe({

      next: (response: LoginResponse) => {

        this.isLoading = false;

        sessionStorage.setItem('authToken', response.token);
        sessionStorage.setItem('userId', response.userId);
        sessionStorage.setItem('userName', response.userName);
        sessionStorage.setItem('userEmail', response.email);
        sessionStorage.setItem('userRoles', JSON.stringify(response.roles));

        console.log('Login successful', response);
      },

      error: (error) => {

        this.isLoading = false;

        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password.';
        }
        else if (error.status === 0) {
          this.errorMessage = 'Unable to connect to server. Please try again.';
        }
        else {
          this.errorMessage =
            error.error?.message || 'Login failed. Please try again.';
        }
      }
    });
  }
}
