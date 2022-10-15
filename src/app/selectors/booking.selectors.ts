
import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import * as fromBookings from '../reducers/booking.reducer';

const bookingState = (state: AppState) => state.bookings;

export const selectLoading = createSelector(
  bookingState,
  (state) => fromBookings.getLoading(state)
);

export const selectLoaded = createSelector(
  bookingState,
  (state) => fromBookings.getLoaded(state)
);

export const selectBookings = createSelector(
  bookingState,
  (state) => fromBookings.all(state)  
);

export const selectSaving = createSelector(
  bookingState,
  (state) => fromBookings.getSaving(state)
);

export const selectSaved = createSelector(
  bookingState,
  (state) => fromBookings.getSaved(state)
);

export const selectSelectedDate = createSelector(
  bookingState,
  (state) => fromBookings.getSelectedDate(state)
);

export const selectBookingsBySelectedDate = createSelector(
  bookingState,
  (state) => fromBookings.getBookingsBySelectedDate(state)
);

export const selectBookingDates = createSelector(
  bookingState,
  (state) => fromBookings.getBookingDates(state)
);
