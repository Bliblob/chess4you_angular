  import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Field } from 'src/data-structure/chess/field/Field';
import { ChessBoard } from 'src/chess-game/chess-game.component';
import {HttpParams} from  "@angular/common/http";

const url = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class ChessGameService {

  constructor(private http: HttpClient) { }

  getPieces(lobbyUUID: string, playerUUID: string): Observable<ChessBoard>{
    let params = new HttpParams().set('lobbyUuid', lobbyUUID).set('playerUuid', playerUUID);
    return this.http.get<ChessBoard>(url + '/getBoard', {params});
  }
}

