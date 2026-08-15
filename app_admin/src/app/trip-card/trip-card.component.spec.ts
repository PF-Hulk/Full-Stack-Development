import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { TripCardComponent } from './trip-card.component';

describe('TripCardComponent', () => {
  const mockTrip: Trip = {
    code: 'GALR210214',
    name: 'Gale Reef',
    length: '4 nights / 5 days',
    start: '2021-02-14T08:00:00.000Z',
    resort: 'Emerald Bay, 3 stars',
    perPerson: '799.00',
    image: 'reef1.jpg',
    description: '<p>Mock Gale Reef description.</p>'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripCardComponent],
      providers: [
        provideRouter([]),
        {
          provide: TripDataService,
          useValue: {
            deleteTrip: () => of(mockTrip)
          }
        }
      ]
    }).compileComponents();
  });

  it('should create and render mock trip data', () => {
    const fixture =
      TestBed.createComponent(TripCardComponent);

    fixture.componentRef.setInput(
      'trip',
      mockTrip
    );

    fixture.detectChanges();

    expect(
      fixture.componentInstance
    ).toBeTruthy();

    expect(
      fixture.nativeElement.textContent
    ).toContain('Gale Reef');

    expect(
      fixture.nativeElement.textContent
    ).toContain('Emerald Bay');
  });
});