import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LobbySearchComponent } from '../lobby-search/lobby-search.component';
import { ChessGameComponent } from '../chess-game/chess-game.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

@NgModule({
   declarations: [
      AppComponent,
      LobbySearchComponent,
      ChessGameComponent,
      ChessGameComponent,
      DashboardComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
