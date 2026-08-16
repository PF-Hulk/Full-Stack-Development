import {
  HttpInterceptorFn
} from '@angular/common/http';

export const jwtInterceptor:
  HttpInterceptorFn =
    (request, next) => {

      const isAuthApi =
        request.url.endsWith(
          '/login'
        ) ||
        request.url.endsWith(
          '/register'
        );

      const token =
        localStorage.getItem(
          'travlr-token'
        );

      if (
        token &&
        !isAuthApi
      ) {

        request =
          request.clone({
            setHeaders: {
              Authorization:
                `Bearer ${token}`
            }
          });
      }

      return next(request);
    };
