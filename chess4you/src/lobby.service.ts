import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, filter, flatMap } from 'rxjs/operators';
import { ILobby } from './data-structure/Lobby';

@Injectable({
  providedIn: 'root'
})

export class LobbyService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080';

  join(playerName: String, uuid: String): Observable<ILobby> {
    return this.http.get<ILobby>(this.url + '/joinLobby/' + playerName + '/' + uuid);
  }

  getListLobbys(): Observable<ILobby[]> {
    return this.http.get<ILobby[]>(this.url + '/getListLobby');
  }

  getLobby(uuid: String): Observable<ILobby> {
    return this.http.get<ILobby>(this.url + '/getLobby/' + uuid);
  }

  initLobby(playerName: String, color: Boolean): Observable<ILobby> {
    return this.http.get<ILobby>(this.url + '/initLobby/' + playerName + '/' + color);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
