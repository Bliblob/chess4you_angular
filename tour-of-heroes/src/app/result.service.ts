import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, filter, flatMap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';
import { Result } from './result';
import { log } from 'util';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ResultService {

  private heroesUrl = 'http://localhost:8099/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Result from the server */
  private getResult(): Observable<Result[]> {
    return this.http.get<Result[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getHeroes(): Observable<Hero[]> {
    let heroes: Hero[] = [];
    let result: Result;
    let tmp: Object;
    this.getResult().subscribe(
      data => {
        tmp = data;
        result = <Result>tmp;
        result._embedded.heroList.forEach((h) => {
           heroes.push(new Hero(h.id, h.name));
          });
      }
    );
    // create simple observable from heroes
    return of(heroes);
  }

  getHero(id: number): Observable<Hero> {
    let hero: Hero;
    let result: Result;
    let tmp: Object;
    this.getResult().subscribe(
      data => {
        tmp = data;
        result = <Result>tmp;
        result._embedded.heroList.forEach((h) => {
          if (h.id === id) {
            hero = new Hero(h.id, h.name);
          }
        });
      }
    );
    // create simple observable from heroes
    return of(hero);
  }

  searchHeroes(term: string): Observable<Hero[]> {
    let heroes: Hero[] = [];
    let filterHeroes: Hero[] = [];
    let result: Result;
    let tmp: Object;
    this.getResult().subscribe(
      data => {
        tmp = data;
        result = <Result>tmp;
        result._embedded.heroList.forEach((h) => {
          heroes.push(new Hero(h.id, h.name));
        });
      }
    );
    if (!term.trim()) {
      return of([]);
    }
    return of(filterHeroes);
  }
  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(url, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
