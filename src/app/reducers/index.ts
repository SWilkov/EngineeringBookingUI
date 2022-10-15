import { ActionReducerMap } from '@ngrx/store';
import * as fromBookings from './booking.reducer';
import * as fromTimeSlots from './time-slot.reducer';

/// main store of the application holding all the app states
export interface AppState {
  bookings: fromBookings.BookingState;
  timeSlots: fromTimeSlots.TimeSlotState;
}

/// Export reducers for app.module
export const reducers: ActionReducerMap<AppState> = {
  bookings: fromBookings.bookingReducer,
  timeSlots: fromTimeSlots.timeSlotReducer
};
