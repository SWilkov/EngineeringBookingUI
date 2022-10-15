import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TimeSlotService } from "../services/time-slot.service";
import * as timeSlotActions from '../actions/time-slot.actions';
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class TimeSlotEffects {
  constructor(private actions$: Actions,
    private timeSlotService: TimeSlotService) {}

  loadTimeSlots$ = createEffect(() => this.actions$.pipe(
    ofType(timeSlotActions.loadTimeSlots),
    mergeMap(() => this.timeSlotService.all()
      .pipe(
        map((response) => timeSlotActions.loadTimeSlotsSuccess({payload: response})),
        catchError((error) => of(timeSlotActions.loadTimeSlotsFailure(error))
        )
      )
    )
  ));
}