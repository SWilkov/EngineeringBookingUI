import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BookingService } from "../services/booking.service";
import * as bookingActions from '../actions/booking.actions';
import { catchError, exhaustMap, map, mergeMap, of, switchMap, tap } from "rxjs";
import { DateHelperService } from "../services/date-helper.service";
import { SnackBarConfig } from "../models/snack-bar-config";
import { SnackBarService } from "../services/snack-bar.service";

@Injectable()
export class BookingEffects {
  constructor(private actions$: Actions,
    private bookingService: BookingService,
    private dateHelperService: DateHelperService,
    private snackBarService: SnackBarService) {}

  loadBookings$ = createEffect(() => this.actions$.pipe(
    ofType(bookingActions.loadBookings),
    mergeMap(() => this.bookingService.all()
      .pipe(
        map((response) => bookingActions.loadBookingsSuccess({payload: response})),
        catchError((error) => of(bookingActions.loadBookingsFailure(error))
        )
      )
    )
  ));

  saveBooking$ = createEffect(() => this.actions$.pipe(
    ofType(bookingActions.saveBooking),
    switchMap((action) => this.bookingService.save(action.payload)
      .pipe(
        map((response) => bookingActions.saveBookingSuccess({payload: response})),
        tap((action) => {
          let config: SnackBarConfig = new SnackBarConfig(`Booking saved successfully for: ${action.payload.customer?.firstName} ${action.payload.customer?.lastName}`, "", 5);
          this.snackBarService.open(config);
        }),
        catchError((error) => of(bookingActions.saveBookingFailure(error))
        )
      )
    )
  ));  

  formatBookingDates$ = createEffect(() => this.actions$.pipe(
    ofType(bookingActions.saveBookingTimeSlotChanged),
    exhaustMap((payload) => this.dateHelperService.format(payload.date, payload.timeSlot)
      .pipe(
        map((response) => bookingActions.saveBookingTimeSlotChangedSuccess({payload: response})),
        catchError((error) => of(bookingActions.saveBookingTimeSlotChangedFailure(error))
      )))));
}
