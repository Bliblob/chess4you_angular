import { Injectable } from '@angular/core';
import { IGameService } from 'src/interfaces/interface-game-service';
import { Movement } from 'src/data-structure/chess/Movement';
import { Url } from 'url';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChessBoard, Info } from 'src/chess-game/chess-game.component';
import { map } from 'rxjs/operators';

const urlServer = '172.16.1.198:8081';

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

  connect(urlServer: Url, uuidLobby: string, uuidPlayer: string) {
    let formData: FormData = new FormData();
    formData.append('lobbyUuid', uuidLobby);
    formData.append('playerUuid', uuidPlayer);
    return this.http.post(urlServer + '/connect', formData)
    .subscribe(map((response: string) => { return response;} ));;
  }

  getInfo(urlServer: Url, uuidLobby: string, uuidPlayer: string) {
    let params = new HttpParams().set('lobbyUuid', uuidLobby).set('playerUuid', uuidPlayer);
    this.info = this.http.get<Info>(urlServer + '/getInfo', {params});
  }

  getBoard(urlServer: Url, uuidLobby: string, uuidPlayer: string) {
    let params = new HttpParams().set('lobbyUuid', uuidLobby).set('playerUuid', uuidPlayer);
    this.board = this.http.get<ChessBoard[][]>(urlServer + '/getBoard', {params});
  }

  getTurn(urlServer: Url, uuidPlayer: string, uuidLobby: string, position: Position): Observable<Movement[]> {
    const stringPosition = JSON.stringify(position);
    const params = new HttpParams().set('lobbyUuid', uuidLobby).set('playerUuid', uuidPlayer).set('position', stringPosition);
    return this.http.get<Movement[]>(urlServer + '/getTurn', {params});
  }

  doTurn(urlServer: Url, uuidPlayer: string, uuidLobby: string, movement: Movement) {
    let params = new HttpParams().set('lobbyUuid', uuidLobby).set('playerUuid', uuidPlayer).set('movement', JSON.stringify(movement));
    return this.http.post<ChessBoard>(urlServer + '/doTurn', {params}, options);
  }

  interval(){
    //this.getInfo();
    //this.getBoard();
    //this.getTurn();
  }

constructor(private http: HttpClient) { setInterval(() => { this.interval(); }, 3000) }

}
