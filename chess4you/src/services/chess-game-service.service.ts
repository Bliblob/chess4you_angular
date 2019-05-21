import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Field } from 'src/data-structure/chess/field/Field';

@Injectable({
  providedIn: 'root'
})
export class ChessGameServiceService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080';

  getPieces(uuid: String): Observable<Object>{
    return this.http.get<Object>(this.url + '/hasBoardChanged/' + uuid);
  }
}
