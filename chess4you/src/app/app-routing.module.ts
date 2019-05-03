import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LobbySearchComponent } from '../lobby-search/lobby-search.component';
import { ChessGameComponent } from '../chess-game/chess-game.component';
import { PlayerSearchComponent } from '../player-search/player-search.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  { path: 'lobby', component: LobbySearchComponent },
  { path: 'game', component: ChessGameComponent },
  { path: 'playersearch', component: PlayerSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
