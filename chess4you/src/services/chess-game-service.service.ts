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

  getPieces(uuid: String): Observable<Field[][]>{
    return this.http.get<Field[][]>(this.url + '/hasBoardChanged/' + uuid);
  }
}
