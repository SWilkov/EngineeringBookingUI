import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BookingService } from "../services/booking.service";
import * as bookingActions from '../actions/booking.actions';
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from "rxjs";
import { DateHelperService } from "../services/date-helper.service";

@Injectable()
export class BookingEffects {
  constructor(private actions$: Actions,
    private bookingService: BookingService,
    private dateHelperService: DateHelperService) {}

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
