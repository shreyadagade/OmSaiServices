import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { ForgotPassword } from './pages/forgot-password/forgot-password';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'account/login', component: Login },
  { path: 'account/forgot-password', component: ForgotPassword },
  { path: '**', redirectTo: '' }
];