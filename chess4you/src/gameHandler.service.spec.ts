/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GameHandlerService } from './gameHandler.service';

describe('Service: GameHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameHandlerService]
    });
  });

  it('should ...', inject([GameHandlerService], (service: GameHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
