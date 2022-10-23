import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarConfig } from '../models/snack-bar-config';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) { }

  open = (config: SnackBarConfig):  void => {
    this._snackBar.open(config.message, config.action, config.matSnackBarConfig);
  }
}
