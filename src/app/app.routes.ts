import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
      },
      {
        path: 'classes',
        loadComponent: () => import('./pages/classes/classes.page').then(m => m.ClassesPage)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.page').then(m => m.SettingsPage)
      },
    ]
  },
  {
    path: 'teachers',
    loadComponent: () => import('./pages/teachers/teachers.page').then( m => m.TeachersPage)
  },
];
