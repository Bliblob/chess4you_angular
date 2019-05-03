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
  isLoading = false;
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

  joinLobby(uuid: String) {
    this.isLoading = true;
    setTimeout(() => {
      window.open('/dashboard/' + uuid, '_self');
    }, 3000);
  }
  toggleModal(uuid: String) {
    this.ModalName = uuid;
    this.isModalActive = !this.isModalActive;
  }
}
