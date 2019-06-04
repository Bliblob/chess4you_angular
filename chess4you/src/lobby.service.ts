import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ILobby } from './data-structure/Lobby';
import { Lobby } from './interfaces/lobby';

const url = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class LobbyService implements Lobby{

  constructor(private http: HttpClient) { }

  getListLobbys(): Observable<Lobby[]> {
    return this.http.get<Lobby[]>(url + '/getAllLobby');
  }

  getLobby(lobbyUuid: string): Observable<ILobby> {
    const params = new HttpParams()
    .set('lobbyUuid', lobbyUuid);
    return this.http.get<ILobby>(url + '/getLobby', {params});
  }

  initLobby(playerName: string, color: string): Observable<ILobby> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post<ILobby>(url + '/initLobby', {playerName, color}, options);
  }

  join(lobbyUuid: string, playerName: string): Observable<ILobby> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post<ILobby>(url + '/joinLobby', {lobbyUuid, playerName}, options);
  }

}
