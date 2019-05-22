import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Field } from 'src/data-structure/chess/field/Field';
import { ChessBoard } from 'src/chess-game/chess-game.component';

@Injectable({
  providedIn: 'root'
})
export class ChessGameServiceService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080';

  getPieces(uuid: String): Observable<ChessBoard>{
    return this.http.get<ChessBoard>(this.url + '/hasBoardChanged/' + uuid);
  }
}
