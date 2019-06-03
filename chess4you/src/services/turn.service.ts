import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movement } from '../data-structure/chess/Movement';
import { ChessBoard } from 'src/chess-game/chess-game.component';
import { Position } from 'src/data-structure/chess/pieces/Piece';

const url = 'http://localhost:8080';

const options = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class TurnService {

  constructor(private http: HttpClient) { }

  getTurn(lobbyUUID: string, playerUUID: string, position: Position): Observable<Movement>{
    let params = new HttpParams().set('lobbyUuid', lobbyUUID).set('playerUuid', playerUUID).set('position', JSON.stringify(position));
    return this.http.get<Movement>(url + '/getTurn', {params});
  }

  doTurn(lobbyUUID: string, playerUUID: string, position: string): Observable<ChessBoard>{
    let params = new HttpParams().set('lobbyUuid', lobbyUUID).set('playerUuid', playerUUID).set('position', position);
    return this.http.post<ChessBoard>(url + '/doTurn', {params}, options);
  }
}
