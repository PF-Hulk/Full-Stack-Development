import { CommonModule } from '@angular/common';

import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { Trip } from '../models/trip';

import {
  TripDataService
} from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent
  implements OnInit {

  editForm!: FormGroup;

  trip!: Trip;

  submitted = false;
  message = '';

  private tripCode = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.editForm =
      this.formBuilder.group({

        code: [
          '',
          Validators.required
        ],

        name: [
          '',
          Validators.required
        ],

        length: [
          '',
          Validators.required
        ],

        start: [
          '',
          Validators.required
        ],

        resort: [
          '',
          Validators.required
        ],

        perPerson: [
          '',
          Validators.required
        ],

        image: [
          '',
          Validators.required
        ],

        description: [
          '',
          Validators.required
        ]
      });

    this.tripCode =
      localStorage.getItem(
        'tripCode'
      ) ?? '';

    if (!this.tripCode) {

      this.message =
        'No trip was selected for editing.';

      this.changeDetectorRef
        .markForCheck();

      return;
    }

    this.tripDataService
      .getTrip(this.tripCode)
      .subscribe({

        next: (trips: Trip[]) => {

          if (!trips.length) {

            this.message =
              `Trip ${this.tripCode} was not found.`;

            this.changeDetectorRef
              .markForCheck();

            return;
          }

          this.trip = trips[0];

          this.editForm.patchValue({

            ...this.trip,

            start:
              this.trip.start
                ? this.trip.start.substring(
                    0,
                    10
                  )
                : ''
          });

          this.changeDetectorRef
            .markForCheck();
        },

        error: (error: unknown) => {

          this.message =
            'Unable to retrieve the selected trip.';

          console.error(
            this.message,
            error
          );

          this.changeDetectorRef
            .markForCheck();
        }
      });
  }

  get f() {
    return this.editForm.controls;
  }

  onSubmit(): void {

    this.submitted = true;
    this.message = '';

    if (
      this.editForm.invalid ||
      !this.tripCode
    ) {
      return;
    }

    const updatedTrip = {
      ...this.trip,
      ...this.editForm.getRawValue()
    } as Trip;

    this.tripDataService
      .updateTrip(
        this.tripCode,
        updatedTrip
      )
      .subscribe({

        next: () => {

          localStorage.removeItem(
            'tripCode'
          );

          this.router.navigate(['/']);
        },

        error: (error: unknown) => {

          this.message =
            'Unable to update the trip.';

          console.error(
            this.message,
            error
          );

          this.changeDetectorRef
            .markForCheck();
        }
      });
  }

  cancel(): void {

    localStorage.removeItem(
      'tripCode'
    );

    this.router.navigate(['/']);
  }
}