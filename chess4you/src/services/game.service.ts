import { Injectable } from '@angular/core';
import { IGameService } from 'src/interfaces/interface-game-service';
import { Movement } from 'src/data-structure/chess/Movement';
import { Url } from 'url';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChessBoard, Info } from 'src/chess-game/chess-game.component';
import { map } from 'rxjs/operators';

const urlGameServer = '172.16.1.198:8081';

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

  connect(urlGameServer: Url, uuidLobby: string, uuidPlayer: string) {
    let formData: FormData = new FormData();
    formData.append('lobbyUuid', uuidLobby);
    formData.append('playerUuid', uuidPlayer);
    return this.http.post(urlGameServer + '/connect', formData)
    .subscribe(map((response: string) => { return response;} ));;
  }

  getInfo(urlGameServer: Url, uuidLobby: string, uuidPlayer: string) {
    let params = new HttpParams().set('lobbyUuid', uuidLobby).set('playerUuid', uuidPlayer);
    this.info = this.http.get<Info>(urlGameServer + '/getInfo', {params});
  }
  
  getBoard(urlGameServer: Url, uuidLobby: string, uuidPlayer: string) {
    let params = new HttpParams().set('lobbyUuid', uuidLobby).set('playerUuid', uuidPlayer);
    this.board = this.http.get<ChessBoard[][]>(urlGameServer + '/getBoard', {params});
  }

  getTurn(urlGameServer: Url, uuidPlayer: string, uuidLobby: string, position: Position): Observable<Movement[]> {
    const stringPosition = JSON.stringify(position);
    const params = new HttpParams().set('lobbyUuid', uuidLobby).set('playerUuid', uuidPlayer).set('position', stringPosition);
    return this.http.get<Movement[]>(urlGameServer + '/getTurn', {params});
  }

  doTurn(urlGameServer: Url, uuidPlayer: string, uuidLobby: string, movement: Movement) {
    let params = new HttpParams().set('lobbyUuid', uuidLobby).set('playerUuid', uuidPlayer).set('movement', JSON.stringify(movement));
    return this.http.post<ChessBoard>(urlGameServer + '/doTurn', {params}, options);
  }

  interval(){
    //this.getInfo();
    //this.getBoard();
    //this.getTurn();
  }

constructor(private http: HttpClient) { setInterval(() => { this.interval(); }, 3000) }

}
