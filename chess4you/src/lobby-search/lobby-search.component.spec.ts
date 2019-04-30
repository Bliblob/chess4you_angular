/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LobbySearchComponent } from './lobby-search.component';

describe('LobbySearchComponent', () => {
  let component: LobbySearchComponent;
  let fixture: ComponentFixture<LobbySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LobbySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
