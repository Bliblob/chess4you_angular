/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChessGameService } from './chess-game-service.service';

describe('Service: ChessGameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChessGameService]
    });
  });

  it('should ...', inject([ChessGameService], (service: ChessGameService) => {
    expect(service).toBeTruthy();
  }));
});
