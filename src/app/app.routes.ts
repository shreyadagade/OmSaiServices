
import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { Dashboard } from './features/dashboard/dashboard';
import { Roles } from './features/roles/roles';
import { Documents } from './features/documents/documents';
import { Departments } from './features/departments/departments';
import { Qualifications } from './features/qualifications/qualifications';
import { Assets } from './features/assets/assets';
import { Projects } from './features/projects/projects-list';
import { ProjectForm } from './features/projects/project-form';

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
    { path: 'dashboard', component: Dashboard },
    { path: 'admin/role', component: Roles },
    { path: 'admin/document', component: Documents },
    { path: 'admin/department', component: Departments },
    { path: 'admin/qualification', component: Qualifications },
    { path: 'admin/asset', component: Assets },
    { path: 'admin/project', component: Projects },
    { path: 'admin/project/create', component: ProjectForm },
    { path: 'admin/project/edit/:id', component: ProjectForm }
    
  ]
  },
  { path: '**', redirectTo: '' }
];
