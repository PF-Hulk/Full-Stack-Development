import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { EditTripComponent } from './edit-trip.component';

describe('EditTripComponent', () => {
  const mockTrip: Trip = {
    code: 'SUNR260901',
    name: 'Sunset Reef',
    length: '5 nights / 6 days',
    start: '2026-09-01T00:00:00.000Z',
    resort: 'Sunset Cove, 4 stars',
    perPerson: 1299,
    image: 'reef1.jpg',
    description: '<p>Mock Sunset Reef description.</p>'
  };

  beforeEach(async () => {
    localStorage.setItem(
      'tripCode',
      mockTrip.code
    );

    await TestBed.configureTestingModule({
      imports: [EditTripComponent],
      providers: [
        provideRouter([]),
        {
          provide: TripDataService,
          useValue: {
            getTrip: () => of([mockTrip]),
            updateTrip: () => of(mockTrip)
          }
        }
      ]
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.removeItem('tripCode');
  });

  it(
    'should create and populate the edit form from mock data',
    async () => {

      const fixture =
        TestBed.createComponent(EditTripComponent);

      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(
        fixture.componentInstance
      ).toBeTruthy();

      expect(
        fixture.componentInstance.editForm.value.name
      ).toBe('Sunset Reef');

      expect(
        fixture.componentInstance.editForm.value.start
      ).toBe('2026-09-01');
    }
  );
});