import { Routes } from '@angular/router';

/**
 * Rutas de la aplicación
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/transactions/components/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
