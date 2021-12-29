/**
 * Get a fulfilled array of provided type with JSON data
 * @param ctor Type of constructor
 * @param input JSON object of data
 */
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../environments/environment";
import {CustomSnackBarComponent} from "../components/custom-snack-bar/custom-snack-bar.component";

export function initGenericArrayFromJson<T>(
  ctor: new (p: any) => T,
  input: any
): T[] {
  const propertyArray: T[] = [];
  input.forEach((element) => {
    const tmpObj = create(ctor, element);
    propertyArray.push(tmpObj);
  });
  return propertyArray;
}

function create<T>(ctor: new (p: any) => T, val: any): T {
  return new ctor(val);
}

export function showSnackBar(
  snackBar: MatSnackBar,
  message: string,
  status: string,
  icon: string
): void {
  setTimeout(() => {
    snackBar.openFromComponent(CustomSnackBarComponent, {
      data: {message, icon},
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: environment.SNACKBAR_DURATION,
      panelClass: [status]
    });
  }, 0);
}
