import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { TripDataService } from '../services/trip-data.service';
import { AddTripComponent } from './add-trip.component';

describe('AddTripComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTripComponent],
      providers: [
        provideRouter([]),
        {
          provide: TripDataService,
          useValue: {
            addTrip: (trip: unknown) => of(trip)
          }
        }
      ]
    }).compileComponents();
  });

  it('should create the add form', () => {
    const fixture =
      TestBed.createComponent(AddTripComponent);

    fixture.detectChanges();

    expect(
      fixture.componentInstance
    ).toBeTruthy();

    expect(
      fixture.componentInstance.addForm
    ).toBeTruthy();
  });

  it('should require all trip fields', () => {
    const fixture =
      TestBed.createComponent(AddTripComponent);

    fixture.detectChanges();

    expect(
      fixture.componentInstance.addForm.invalid
    ).toBe(true);
  });
});