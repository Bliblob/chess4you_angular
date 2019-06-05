import { Injectable } from '@angular/core';
import { IGameService } from 'src/interfaces/interface-game-service';
import { Movement } from 'src/data-structure/chess/Movement';
import { Url } from 'url';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChessBoard, Info } from 'src/chess-game/chess-game.component';
import { Field } from 'src/data-structure/chess/field/Field';

const urlServer = 'http://localhost:8080';

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
  board: Observable<Field[][]>;

  connect(urlServer: Url, uuidLobby: string, uuidPlayer: string) {

  }

  getInfo(urlServer: Url, uuidLobby: string, uuidPlayer: string) {

  }

  getBoard(urlServer: Url, uuidLobby: string, uuidPlayer: string): Observable<ChessBoard> {
    let params = new HttpParams().set('lobbyUuid', uuidLobby).set('playerUuid', uuidPlayer);
    return this.http.get<ChessBoard>(urlServer + '/getBoard', {params});
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
    this.getInfo();
    this.getBoard();
  }

constructor(private http: HttpClient) { }

}
