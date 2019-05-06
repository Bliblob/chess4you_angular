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

  joinLobby(uuid: String, e) {

    //to make this function work remove the const's and document.getElementById

    //Get id from the element
    const elementId = e.id;

    //use id to change the class name
    document.getElementById(elementId).className = "button is-info is-inverted is-outlined is-loading has-background-white";

    //open the lobby
    window.open('/dashboard/' + uuid, '_self');

    //setTimeout(() => {

    //}, 3000);
  }

  toggleModal(uuid: String) {
    this.ModalName = uuid;
    this.isModalActive = !this.isModalActive;
  }
}
