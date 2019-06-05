import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Lobby } from './data-structure/Lobby';

const url = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(private http: HttpClient) { }

  getListLobbies(): Observable<Lobby[]> {
    return this.http.get<Lobby[]>(url + '/getAllLobby');
  } 

  getLobby(lobbyUuid: string): Observable<Lobby> {
    const params = new HttpParams()
    .set('lobbyUuid', lobbyUuid);
    return this.http.get<Lobby>(url + '/getLobby', {params});
  }

  initLobby(playerName: string, color: string): Observable<Lobby> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post<Lobby>(url + '/initLobby', {playerName, color}, options);
  }

  join(lobbyUuid: string, playerName: string): Observable<Lobby> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post<Lobby>(url + '/joinLobby', {lobbyUuid, playerName}, options);
  }

}
