import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonInfoComponent } from './components/pokemon-info/pokemon-info.component';

export const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'api/pokemon/:name', component: PokemonInfoComponent },
  { path: 'api/pokemon/:**', component: PokemonInfoComponent },
  { path: '**', component: PokemonListComponent },
];
