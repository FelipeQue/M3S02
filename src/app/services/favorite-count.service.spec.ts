import { TestBed } from '@angular/core/testing';

import { FavoriteCountService } from './favorite-count.service';

describe('FavoriteCountService', () => {
  let service: FavoriteCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
