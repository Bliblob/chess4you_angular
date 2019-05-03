import { Component, OnInit } from '@angular/core';
import { LobbyService } from '../lobby.service';
import { ILobby } from 'src/data-structure/Lobby';
import { stringify } from '@angular/compiler/src/util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ListLobby: ILobby[];
  Lobby: ILobby;
  isSearchModalActive: Boolean = false;
  isJoinModalActive: Boolean = false;
  isSearching: Boolean = true;
  isJoinSuccess: Boolean = false;
  isMessageActive: Boolean = false;
  Message: String;

  uuid: String;
  playerName: String;

  constructor(
    private lobbyService: LobbyService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.getGame();
  }

  getGame() {
    if (this.route.snapshot.paramMap.get('uuid')) {
      this.uuid = this.route.snapshot.paramMap.get('uuid');
      this.toggleJoinModal();
    }
  }

  searchLobbyModal() {
    this.lobbyService.getListLobbys()
    .subscribe(
      data => this.ListLobby = data
    );
    if (typeof this.ListLobby !== 'undefined') {
      this.isSearching = false;
      this.Lobby = this.ListLobby[0];
    }
    this.toggleSearchModal();
  }

  joinLobbyModal() {
    this.toggleJoinModal();
  }

  showLobby() {
    window.open('/lobby', '_self');
  }

  joinLobbyJoinModal(uuid: String) {
    this.isJoinModalActive = false;
    this.joinLobby(uuid);
  }

  joinLobbySearchModal(uuid: String) {
    this.isSearchModalActive = false;
    this.joinLobby(uuid);
  }

  joinLobby(uuid: String) {
    this.lobbyService.join(this.playerName, this.uuid).subscribe(
      data => this.isJoinSuccess = data.StartGame
    );
    this.Message = this.isJoinSuccess ? 'Connection was a Success' : 'Connection has Failed';
    this.isMessageActive = true;
  }

  initLobby() {
    this.isJoinSuccess = true;
    this.delay(30000);
    window.open('/game', '_self');
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
}

toggleJoinModal() {
  this.isJoinModalActive = !this.isJoinModalActive;
}

  toggleSearchModal() {
    this.isSearchModalActive = !this.isSearchModalActive;
  }
}
