import {
  Inject,
  Injectable
} from '@angular/core';

import {
  BROWSER_STORAGE
} from '../storage';

import {
  User
} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly tokenKey =
    'travlr-token';

  constructor(
    @Inject(BROWSER_STORAGE)
    private storage: Storage
  ) {}

  saveToken(
    token: string
  ): void {

    this.storage.setItem(
      this.tokenKey,
      token
    );
  }

  getToken(): string {

    return this.storage.getItem(
      this.tokenKey
    ) ?? '';
  }

  logout(): void {

    this.storage.removeItem(
      this.tokenKey
    );
  }

  isLoggedIn(): boolean {

    const token =
      this.getToken();

    if (!token) {
      return false;
    }

    try {

      const payloadPart =
        token.split('.')[1]
          .replace(/-/g, '+')
          .replace(/_/g, '/');

      const padded =
        payloadPart.padEnd(
          Math.ceil(
            payloadPart.length / 4
          ) * 4,
          '='
        );

      const payload =
        JSON.parse(
          atob(padded)
        );

      return (
        typeof payload.exp === 'number' &&
        payload.exp >
          Date.now() / 1000
      );

    } catch {

      return false;
    }
  }

  getCurrentUser():
    User | null {

    if (!this.isLoggedIn()) {
      return null;
    }

    try {

      const token =
        this.getToken();

      const payloadPart =
        token.split('.')[1]
          .replace(/-/g, '+')
          .replace(/_/g, '/');

      const padded =
        payloadPart.padEnd(
          Math.ceil(
            payloadPart.length / 4
          ) * 4,
          '='
        );

      const payload =
        JSON.parse(
          atob(padded)
        );

      return {
        email:
          payload.email ?? '',
        name:
          payload.name ?? ''
      };

    } catch {

      return null;
    }
  }
}
