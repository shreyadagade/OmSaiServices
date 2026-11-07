
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPassword {

  email = '';
  message = '';

  onSubmit() {
    if (!this.email.trim()) {
      this.message = 'Please enter your email address.';
      return;
    }

    this.message = 'Password reset functionality will be available soon.';
  }
}
