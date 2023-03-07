import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { DrinkComponent } from './drink-game/drink/drink.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: MainComponent,
  },
  {
    path: 'we-polej',
    component: DrinkComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard',
  },
  { path: '**', component: PageNotFoundComponent },
];
