import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LobbySearchComponent } from '../lobby-search/lobby-search.component';
import { ChessGameComponent } from '../chess-game/chess-game.component';

const routes: Routes = [ 
  { path: 'lobby', component: LobbySearchComponent },
  { path: 'game', component: ChessGameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
