import { Component, OnInit } from '@angular/core';
import { LobbyService } from '../lobby.service';
import { ILobby } from '../data-structure/Lobby';
import { element } from '@angular/core/src/render3';

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

  joinLobby(event): void {
    const id = event.target.id;
    document.querySelector('[id=' + CSS.escape(id) + ']').className = 'button is-info is-loading';
    setTimeout(() => {
      this.openDashboard(id);
    }, 3000);
  }

  openDashboard(uuid: String): void {
    window.open('/dashboard/' + uuid + '_self');
  }

  toggleModal(uuid: String) {
    this.ModalName = uuid;
    this.isModalActive = !this.isModalActive;
  }
}
