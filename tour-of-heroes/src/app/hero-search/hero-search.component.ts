import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { ResultService } from '../result.service';
import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';

import {
   debounceTime, distinctUntilChanged, switchMap, filter
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  private heroes: Hero[] = [];
  searchHeroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private resultService: ResultService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchHeroes = [];
    this.heroes.forEach( hero => {
      if (hero.name.includes(term)) {
        this.searchHeroes.push(hero);
      }
      });
  }

  ngOnInit(): void {
    this.resultService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }
}
