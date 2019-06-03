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
    if (this.route.snapshot.paramMap.get('lobbyUUID')) {
      this.lobbyData.lobbyUuid = this.route.snapshot.paramMap.get('lobbyUUID');
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
  async searchLobby() {
    await this.lobbyService.getListLobbys()
    .toPromise()
    .then(
      data => {
        this.listLobby = data;
      }
    );
    this.lobby = this.getLobbyWithSpace(this.listLobby);
    this.joinLobby(this.lobby.Name, this.lobbyData.playerName);
  }

  async createLobby() {
    await this.lobbyService.initLobby(this.lobbyData.playerName.toString(), this.lobbyData.color)
    .toPromise()
    .then(
      data => {
        this.lobby = data;
      }
    );
    console.log(this.lobby);
    this.joinWorked(this.lobby, this.modal.isCreateActive);
  }

  async joinLobby(lobbyUuid: string, playerName: string) {
    if (lobbyUuid !== 'undefined' && playerName !== 'undefined') {
      await this.lobbyService.join(lobbyUuid, playerName)
    .toPromise()
    .then(
      data => {
        this.lobby = data;
      }
    );
    }
    this.joinWorked(this.lobby, this.modal.isJoinActive);
  }

  // search method
  getLobbyWithSpace(ListLobby: ILobby[]): ILobby {
    let Lobby: ILobby;
// tslint:disable-next-line: prefer-const
    let tmpListLobby: ILobby[] = [];
    if (this.isNotEmpty(ListLobby)) {
      ListLobby.forEach( element => {
        if (element.PlayerTwo == null) {
          tmpListLobby.push(element);
        }
      });
      if (this.isNotEmpty(tmpListLobby)) {
        Lobby = tmpListLobby.pop();
      } else {
        Lobby = null;
      }
    } else {
      Lobby = null;
    }
    return Lobby;
  }

  // message method
  joinWorked(Lobby: ILobby, modal: Boolean) {
      const isJoined = Lobby === null ? false : true;
      this.messageData = this.setMessage(isJoined);
      this.modal.isMessageActive = true;
      modal = false;
      this.delay(3000);
      if (isJoined) {
        if (!Lobby.PlayerTwo) {
          window.open('/game/' + Lobby.Name + '/' + Lobby.PlayerOne.Id, '_self');
        }
        window.open('/game/' + Lobby.Name + '/' + Lobby.PlayerTwo.Id, '_self');
      }
  }

  setMessage(isActive: Boolean): MessageData {
    const success = 'Connection was a Success';
    const failed = 'Connection has Failed';
    let message;
    let isSuccess;
    if (this.isNotEmpty(isActive)) {
      message = failed;
      isSuccess = false;
    } else {
      message = isActive ? success : failed;
      isSuccess = isActive;
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
