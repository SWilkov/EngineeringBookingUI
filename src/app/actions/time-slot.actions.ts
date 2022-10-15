import { createAction, props } from "@ngrx/store";
import { TimeSlot } from "../models/time-slot.model";

export const loadTimeSlots = createAction(
  '[TimeSlot] Load TimeSlots'
);

export const loadTimeSlotsSuccess = createAction(
  '[TimeSlot] Load TimeSlots Success',
    props<{ payload: TimeSlot[] }>()
);

export const loadTimeSlotsFailure = createAction(
  '[TimeSlot] Load TimeSlots Failure',
    props<{ payload: Error }>()
);

export const timeSlotSelected = createAction(
  '[TimeSlot] TimeSlot Selected',
    props<{ payload: TimeSlot }>()
);
