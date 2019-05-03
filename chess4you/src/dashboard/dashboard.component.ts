import { Component, OnInit } from '@angular/core';
import { LobbyService } from '../lobby.service';
import { ILobby } from 'src/data-structure/Lobby';
import { ActivatedRoute } from '@angular/router';
import { ModalData } from 'src/data-structure/ModalData';
import { MessageData } from 'src/data-structure/MessageData';
import { LobbyData } from 'src/data-structure/LobbyData';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lobby: ILobby;
  listLobby: ILobby[];

  modal: ModalData = new ModalData();
  messageData: MessageData = new MessageData('', false);
  lobbyData: LobbyData = new LobbyData();

  constructor(
    private lobbyService: LobbyService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.handleParam();
  }

  handleParam() {
    if (this.route.snapshot.paramMap.get('uuid')) {
      this.lobbyData.uuid = this.route.snapshot.paramMap.get('uuid');
      this.toggleJoinModal();
    }
  }

  // open Modal or redirected to page
  openSearchLobby() {
    this.toggleSearchModal();
  }
  openJoinLobby() {
    this.toggleJoinModal();
  }
  openShowLobby() {
    window.open('/lobby', '_self');
  }
  openCreateLobby() {
    this.toggleCreateModal();
  }

  // modal specific methods
  searchLobby() {
    this.lobbyService.getListLobbys().subscribe(
      data => this.listLobby = data
    );
    this.lobby = this.getLobbyWithSpace(this.listLobby);
    this.joinLobby(this.lobbyData.playerName, this.lobby.Name);
  }

  createLobby() {
    this.lobbyService.initLobby(this.lobbyData.playerName, this.lobbyData.color).subscribe(
      data => this.lobby = data
    );
    this.joinWorked(this.lobby);
  }

  joinLobby(playerName: String, uuid: String) {
    this.lobbyService.join(playerName, uuid).subscribe(
      data => this.lobby = data
    );
    this.joinWorked(this.lobby);
  }

  // search method
  getLobbyWithSpace(ListLobby: ILobby[]): ILobby {
    let Lobby: ILobby;
    if (this.isNotEmpty(ListLobby)) {
      ListLobby = ListLobby
      .filter(element => this.isNotEmpty(element.PlayerTwo));
      if (this.isNotEmpty(ListLobby)) {
        Lobby = ListLobby.pop();
      } else {
        Lobby = null;
      }
    } else {
      Lobby = null;
    }
    return Lobby;
  }

  // message method
  joinWorked(Lobby: ILobby) {
      this.messageData = this.setMessage(Lobby);
      this.modal.isMessageActive = true;
      this.delay(3000);
      window.open('/game' + Lobby.Name, '_self');
  }

  setMessage(Lobby: ILobby): MessageData {
    const success = 'Connection was a Success';
    const failed = 'Connection has Failed';
    let message;
    let isSuccess;
    if (this.isNotEmpty(Lobby)) {
      message = failed;
      isSuccess = false;
    } else {
      message = Lobby.StartGame ? success : failed;
      isSuccess = Lobby.StartGame;
    }
    return new MessageData(message, isSuccess);
  }

  // await function from stackoverflow
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }

  isNotEmpty(Object: Object): Boolean {
    for (const key in Object) {
      if (Object.hasOwnProperty(key)) {
        return true;
      }
    }
    return false;
  }

  // toggle Modal
  toggleCreateModal() {
    this.modal.isCreateActive = !this.modal.isCreateActive;
  }
  toggleJoinModal() {
    this.modal.isJoinActive = !this.modal.isJoinActive;
  }
  toggleSearchModal() {
    this.modal.isSearchActive = !this.modal.isSearchActive;
  }
  toggleMessageModal() {
    this.modal.isMessageActive = !this.modal.isMessageActive;
  }
}
