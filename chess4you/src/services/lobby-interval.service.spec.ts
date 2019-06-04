/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LobbyIntervalService } from './lobby-interval.service';

describe('Service: LobbyInterval', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LobbyIntervalService]
    });
  });

  it('should ...', inject([LobbyIntervalService], (service: LobbyIntervalService) => {
    expect(service).toBeTruthy();
  }));
});
