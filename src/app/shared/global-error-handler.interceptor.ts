import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandlerInterceptor implements ErrorHandler {
  constructor(private _snackBar: MatSnackBar, private zone: NgZone) {}

  handleError(error: any) {
    // Check if it's an error from an HTTP response
    if (true) {
      console.error({ error });
    }
    this.zone.run(() =>
      this._snackBar.open(
        error?.message || 'Undefined client error',
        'Anuluj',
        {
          duration: 3000,
        }
      )
    );

    console.error('Error from global error handler', error);
  }
}
