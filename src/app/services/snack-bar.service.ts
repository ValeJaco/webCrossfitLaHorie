import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomSnackBarComponent} from "../components/custom-snack-bar/custom-snack-bar.component";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  showSnackBar(
    message: string,
    status: string,
    icon: string
  ): void {
    setTimeout(() => {
      this.snackBar.openFromComponent(CustomSnackBarComponent, {
        data: {message, icon, status},
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: environment.SNACKBAR_DURATION,
        panelClass: [status]
      });
    }, 0);
  }

  showErrorSnackBar(message: string, icon: string = "error") {
    this.showSnackBar(message, "error-snackbar", icon)
  }

  showSuccesSnackBar(message: string, icon: string = "check") {
    this.showSnackBar(message, "success-snackbar", icon)
  }

  showWarningSnackBar(message: string, icon: string = "warning") {
    this.showSnackBar(message, "warning-snackbar", icon)
  }

}
