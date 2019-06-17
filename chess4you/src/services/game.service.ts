import { Injectable } from '@angular/core';
import { IGameService } from 'src/interfaces/interface-game-service';
import { Movement } from 'src/data-structure/chess/Movement';
import { Url } from 'url';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChessBoard, Info } from 'src/chess-game/chess-game.component';
import { map } from 'rxjs/operators';

const urlGameServer = '172.16.1.198:8081';
const urlLobbyServer = '172.16.1.198:8082';

const options = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class GameService implements IGameService {

  info: Observable<Info>;
  board: Observable<ChessBoard[][]>;

  connect(urlLobbyServer: Url, uuidLobby: string, uuidPlayer: string) {
    let formData: FormData = new FormData();
    formData.append('lobbyUuid', uuidLobby);
    formData.append('playerUuid', uuidPlayer);
    return this.http.post(urlLobbyServer + '/connect', formData)
    .subscribe(map((response: string) => { return response;} ));;
  }

  getInfo(urlLobbyServer: Url, uuidLobby: string, uuidPlayer: string) {
    let params = new HttpParams().set('lobbyUuid', uuidLobby).set('playerUuid', uuidPlayer);
    this.info = this.http.get<Info>(urlLobbyServer + '/getInfo', {params});
  }
  
  getBoard(urlLobbyServer: Url, uuidLobby: string, uuidPlayer: string) {
    let params = new HttpParams().set('lobbyUuid', uuidLobby).set('playerUuid', uuidPlayer);
    this.board = this.http.get<ChessBoard[][]>(urlLobbyServer + '/getBoard', {params});
  }

  getTurn(urlLobbyServer: Url, uuidPlayer: string, uuidLobby: string, position: Position): Observable<Movement[]> {
    const stringPosition = JSON.stringify(position);
    const params = new HttpParams().set('lobbyUuid', uuidLobby).set('playerUuid', uuidPlayer).set('position', stringPosition);
    return this.http.get<Movement[]>(urlLobbyServer + '/getTurn', {params});
  }

  doTurn(urlLobbyServer: Url, uuidPlayer: string, uuidLobby: string, movement: Movement) {
    let params = new HttpParams().set('lobbyUuid', uuidLobby).set('playerUuid', uuidPlayer).set('movement', JSON.stringify(movement));
    return this.http.post<ChessBoard>(urlLobbyServer + '/doTurn', {params}, options);
  }

  interval(){
    //this.getInfo();
    //this.getBoard();
    //this.getTurn();
  }

constructor(private http: HttpClient) { setInterval(() => { this.interval(); }, 3000) }

}
