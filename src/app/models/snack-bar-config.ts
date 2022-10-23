import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from "@angular/material/snack-bar";

export class SnackBarConfig {  
  private _matSnackBarConfig: MatSnackBarConfig;

  public get matSnackBarConfig() {
    return this._matSnackBarConfig;
  }

  private _message: string;
  public get message() {
    return this._message;
  }

  private _action: string;
  public get action() {
    return this._action;
  }
  
  constructor(message: string, action: string = '', durationInSeconds: number = 3,
    horizontalPosition: MatSnackBarHorizontalPosition = "end",
    verticalPosition: MatSnackBarVerticalPosition = "top") {
      this._message = message;
      this._action = action;      

      this._matSnackBarConfig = {
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition,
        duration: durationInSeconds * 1000, 
        direction: "ltr"
      }
  }
}