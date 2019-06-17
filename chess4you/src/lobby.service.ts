import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Lobby } from './data-structure/Lobby';

const urlLobbyServer = 'https://172.16.1.198:8082';
console.log(urlLobbyServer);

const options = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(private http: HttpClient) { }

  getListLobbies(): Observable<Lobby[]> {
    return this.http.get<Lobby[]>(urlLobbyServer + '/getAllLobby');
  } 

  getLobby(lobbyUuid: string): Observable<Lobby> {
    const params = new HttpParams()
    .set('lobbyUuid', lobbyUuid);
    return this.http.get<Lobby>(urlLobbyServer + '/getLobby', {params});
  }

  initLobby(playerName: string, color: string): Observable<Lobby> {
    return this.http.post<Lobby>(urlLobbyServer + '/initLobby', {playerName, color}, options);
  }

  join(lobbyUuid: string, playerName: string): Observable<Lobby> {
    return this.http.post<Lobby>(urlLobbyServer + '/joinLobby', {lobbyUuid, playerName}, options);
  }

}
