import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TripDataService } from './trip-data.service';

describe('TripDataService', () => {
  it('should be created', () => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });

    const service =
      TestBed.inject(TripDataService);

    expect(service).toBeTruthy();
  });
});