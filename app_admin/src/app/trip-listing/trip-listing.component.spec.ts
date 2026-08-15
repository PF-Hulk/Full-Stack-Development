import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { TripListingComponent } from './trip-listing.component';

describe('TripListingComponent', () => {
  const mockTrips: Trip[] = [
    {
      code: 'GALR210214',
      name: 'Gale Reef',
      length: '4 nights / 5 days',
      start: '2021-02-14T08:00:00.000Z',
      resort: 'Emerald Bay, 3 stars',
      perPerson: '799.00',
      image: 'reef1.jpg',
      description: '<p>Mock Gale Reef description.</p>'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripListingComponent],
      providers: [
        provideRouter([]),
        {
          provide: TripDataService,
          useValue: {
            getTrips: () => of(mockTrips),
            deleteTrip: () => of(mockTrips[0])
          }
        }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture =
      TestBed.createComponent(TripListingComponent);

    fixture.detectChanges();

    expect(
      fixture.componentInstance
    ).toBeTruthy();
  });

  it('should load and display mock trip data', async () => {
    const fixture =
      TestBed.createComponent(TripListingComponent);

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(
      fixture.componentInstance.trips.length
    ).toBe(1);

    expect(
      fixture.nativeElement.textContent
    ).toContain('Gale Reef');
  });
});