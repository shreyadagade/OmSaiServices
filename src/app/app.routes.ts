
import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { Dashboard } from './features/dashboard/dashboard';

import { PublicLayout } from './layouts/public-layout/public-layout';
import { LoginLayout } from './layouts/login-layout/login-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', component: Home }
    ]
  },
  {
    path: '',
    component: LoginLayout,
    children: [
      { path: 'account/login', component: Login },
      { path: 'account/forgot-password', component: ForgotPassword }
    ]
  },
  {
    path: '',
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: Dashboard }
    ]
  },
  { path: '**', redirectTo: '' }
];
