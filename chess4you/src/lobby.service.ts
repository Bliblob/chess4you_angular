import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

}
