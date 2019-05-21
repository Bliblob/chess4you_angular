import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IChessBoard } from 'src/chess-game/chess-game.component';

@Injectable({
  providedIn: 'root'
})
export class ChessGameServiceService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080';

  getChessBoard(uuid: String): Observable<IChessBoard> {
    return this.http.get<IChessBoard>(this.url + '/hasBoardChanged/' + uuid);
  }
}
