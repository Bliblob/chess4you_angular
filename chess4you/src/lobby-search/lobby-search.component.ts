import { Component, OnInit } from '@angular/core';
import { LobbyService } from '../lobby.service';
import { ILobby } from '../data-structure/Lobby';

@Component({
  selector: 'app-lobby-search',
  templateUrl: './lobby-search.component.html',
  styleUrls: ['./lobby-search.component.css']
})
export class LobbySearchComponent implements OnInit {

  ListLobby: ILobby[] = new Array();
  Lobby: ILobby;
  isModalActive = false;
  buttonJoinStatus = true;
  ModalName: String;
  playerName: Object;
  constructor(private lobbyService: LobbyService) { }

  ngOnInit() {
    this.getListLobby();
  }
  getListLobby(): void {
    this.lobbyService.getListLobbys()
    .subscribe(
      data => this.ListLobby = data
    );
  }

  joinLobby(playerName: String, uuid: string) {
    // document.getElementById('join').className = 'button is-info is-inverted is-outlined is-loading has-background-white';
    console.log(playerName + uuid);
    this.lobbyService.join(playerName, uuid)
    .subscribe(
      data => this.Lobby = data
    );
  }
  toggleModal(uuid: String) {
    this.ModalName = uuid;
    this.isModalActive = !this.isModalActive;
  }
}
