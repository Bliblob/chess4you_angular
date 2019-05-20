/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChessGameServiceService } from './chess-game-service.service';

describe('Service: ChessGameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChessGameServiceService]
    });
  });

  it('should ...', inject([ChessGameServiceService], (service: ChessGameServiceService) => {
    expect(service).toBeTruthy();
  }));
});
