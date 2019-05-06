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

  joinLobby(e) {
    const elementId = e.id;
    //const elementClass = e.target.className;

    alert(elementId);

    //alert(elementId + + " " + elementClass);



    //document.getElementById(elementClass).className = "button is-info is-inverted is-outlined is-loading has-background-white";

    //setTimeout(() => {
      //window.open('/dashboard/' + uuid, '_self');
    //}, 3000);
  }

  toggleModal(uuid: String) {
    this.ModalName = uuid;
    this.isModalActive = !this.isModalActive;
  }
}
