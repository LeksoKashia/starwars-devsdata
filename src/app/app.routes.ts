import { Routes } from '@angular/router';
import { RoutesEnum } from './core/const/route.enums';

export const routes: Routes = [
  {
    path: '',
    redirectTo: RoutesEnum.HOME,
    pathMatch: 'full',
  },
  {
    path: RoutesEnum.HOME,
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: `${RoutesEnum.CHARACTER}/:id`,
    loadComponent: () =>
      import('./pages/details/details.component').then(
        (m) => m.DetailsComponent
      ),
  },

  { path: '**', pathMatch: 'full', redirectTo: RoutesEnum.HOME },
];
