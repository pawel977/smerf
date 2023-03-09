import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { DrinkComponent } from './drink-game/components/drink/drink.component';
import { Game } from './drink-game/classes/game';
import { GameComponent } from './drink-game/components/game/game.component';

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
    path: 'we-polej/game/:id',
    component: GameComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard',
  },
  { path: '**', component: PageNotFoundComponent },
];
