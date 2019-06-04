import { Injectable } from '@angular/core';
import { ILobby } from 'src/data-structure/Lobby';

@Injectable({
  providedIn: 'root'
})
export class LobbyIntervalService implements ILobby {

  Name: string;
  StartGame: Boolean;
  PlayerOne: import("../data-structure/Lobby").IPlayer;
  PlayerTwo: import("../data-structure/Lobby").IPlayer;

  interval(){
    this.getListLobbys();
    this.getLobby();
    this.initLobby();
    this.join();
  }

  getListLobbys() {
  }
  getLobby() {
  }
  initLobby() {
  }
  join() {
  }

constructor() {setInterval(()=> { this.interval() }, 3000); }

}
