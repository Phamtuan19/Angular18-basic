import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { AuthService } from 'src/app/services';

// Function-based interceptor
export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService); // Inject AuthService directly

  if (authService.token) {
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authService.token}`,
      },
    });

    // console.log('Modified Request with Auth Header:', req);
  }

  return next(req).pipe(
    catchError((error) => {
      console.error('Error occurred:', error);
      throw error; // Propagate the error
    })
  );
};
