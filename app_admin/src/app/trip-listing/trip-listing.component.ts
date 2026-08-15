import { CommonModule } from '@angular/common';

import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { Trip } from '../models/trip';

import {
  TripCardComponent
} from '../trip-card/trip-card.component';

import {
  TripDataService
} from '../services/trip-data.service';

@Component({
  selector: 'app-trip-listing',
  imports: [
    CommonModule,
    RouterLink,
    TripCardComponent
  ],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css'
})
export class TripListingComponent
  implements OnInit {

  trips: Trip[] = [];

  message = 'Loading trips...';

  constructor(
    private tripDataService: TripDataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.refreshTrips();
  }

  refreshTrips(): void {

    this.tripDataService
      .getTrips()
      .subscribe({

        next: (trips: Trip[]) => {

          this.trips = trips;

          this.message =
            trips.length
              ? `There are ${trips.length} trips available.`
              : 'There are no trips available.';

          this.changeDetectorRef
            .markForCheck();
        },

        error: (error: unknown) => {

          this.message =
            'Unable to retrieve trips from the API.';

          console.error(
            this.message,
            error
          );

          this.changeDetectorRef
            .markForCheck();
        }
      });
  }

  onTripDeleted(
    tripCode: string
  ): void {

    this.trips =
      this.trips.filter(
        trip =>
          trip.code !== tripCode
      );

    this.message =
      `Trip ${tripCode} was deleted.`;

    this.changeDetectorRef
      .markForCheck();
  }
}