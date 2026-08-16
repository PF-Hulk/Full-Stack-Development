import {
  CommonModule
} from '@angular/common';

import {
  ChangeDetectorRef,
  Component
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  HttpClient
} from '@angular/common/http';

import {
  Router
} from '@angular/router';

import {
  User
} from '../models/user';

import {
  AuthResponse
} from '../models/auth-response';

import {
  AuthenticationService
} from '../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl:
    './login.component.html',
  styleUrl:
    './login.component.css'
})
export class LoginComponent {

  credentials =
    new User();

  password = '';

  message = '';

  private readonly loginUrl =
    'http://localhost:3000/api/login';

  constructor(
    private http: HttpClient,
    private authenticationService:
      AuthenticationService,
    private router: Router,
    private changeDetectorRef:
      ChangeDetectorRef
  ) {}

  onLoginSubmit(): void {

    this.message =
      'Signing in...';

    this.http
      .post<AuthResponse>(
        this.loginUrl,
        {
          name:
            this.credentials.name,
          email:
            this.credentials.email,
          password:
            this.password
        }
      )
      .subscribe({

        next:
          (response:
            AuthResponse) => {

            this
              .authenticationService
              .saveToken(
                response.token
              );

            this.message =
              'Login successful.';

            this
              .changeDetectorRef
              .markForCheck();

            this.router.navigate([
              '/'
            ]);
          },

        error:
          (error: unknown) => {

            console.error(
              'Login failed:',
              error
            );

            this.message =
              'Login failed. Check your email and password.';

            this
              .changeDetectorRef
              .markForCheck();
          }
      });
  }
}
