import {ErrorHandler, Injectable} from '@angular/core';

import {HttpErrorResponse} from '@angular/common/http';
import {SnackBarService} from "./snack-bar.service";

@Injectable()
export class CustomErrorHandlerService implements ErrorHandler {
  constructor(private snackBarService: SnackBarService) {
  }

  handleError(error: any): any {

    if (error instanceof HttpErrorResponse) {
      if (error.status >= 400 && error.status < 500) {
        this.snackBarService.showErrorSnackBar("400")
        console.log('Error 400');
      } else if (error.status >= 500) {
        this.snackBarService.showErrorSnackBar("500")
        console.log('Error 500');
      } else {
        this.snackBarService.showErrorSnackBar("SERVER_DOWN")
        console.log('Server down');
      }
    } else {
      this.snackBarService.showErrorSnackBar("RANDOM")
      console.log('Random error');
    }

    if (error.action) {
      error.action();
    }
    if (error.message) {
      console.log(error.message);
    }
    if (error.stack) {
      console.log(error.stack);
    }
  }
}

