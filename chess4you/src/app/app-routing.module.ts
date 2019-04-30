import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LobbySearchComponent } from '../lobby-search/lobby-search.component';

const routes: Routes = [
  { path: 'lobby', component: LobbySearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
