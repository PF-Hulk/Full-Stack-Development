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
  selector: 'app-add-trip',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent
  implements OnInit {

  addForm!: FormGroup;

  submitted = false;
  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.addForm =
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
  }

  get f() {
    return this.addForm.controls;
  }

  onSubmit(): void {

    this.submitted = true;
    this.message = '';

    if (this.addForm.invalid) {
      return;
    }

    const trip =
      this.addForm.value as Trip;

    this.tripDataService
      .addTrip(trip)
      .subscribe({

        next: () => {
          this.router.navigate(['/']);
        },

        error: (error: unknown) => {

          this.message =
            'Unable to add the trip.';

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
    this.router.navigate(['/']);
  }
}