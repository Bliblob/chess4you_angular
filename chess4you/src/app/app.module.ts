import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerSearchComponent } from '../player-search/player-search.component';
import { LobbySearchComponent } from '../lobby-search/lobby-search.component';
@NgModule({
   declarations: [
      AppComponent,
      PlayerSearchComponent,
      LobbySearchComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
