import { createAction, props } from "@ngrx/store";
import { BookingDates } from "../models/booking-dates.model";
import { Booking } from "../models/booking.model";
import { TimeSlot } from "../models/time-slot.model";

/// Action methods for the Booking store
export const loadBookings = createAction(
  '[Booking] Load Bookings');

export const loadBookingsSuccess = createAction(
  '[Booking] Load Bookings Success',
    props<{ payload: Booking[] }>()
);

export const loadBookingsFailure = createAction(
  '[Booking] Load Bookings Failure',
    props<{ payload: Error }>()
);

export const saveBooking = createAction(
  '[Booking] Save Booking',
    props<{ payload: Booking }>()
);

export const saveBookingSuccess = createAction(
  '[Booking] Save Booking Success',
    props<{ payload: Booking }>()
);

export const saveBookingFailure = createAction(
  '[Booking] Save Booking Failure',
    props<{ payload: Error }>()
);

export const updateSelectedDate = createAction(
  '[Booking] Update Selected Date',
    props<{ payload: Date }>()
);

export const saveBookingTimeSlotChanged = createAction(
  '[Booking] Save Booking TimeSlot Changed',
    props<{ date: Date, timeSlot: TimeSlot  }>()
);

export const saveBookingTimeSlotChangedSuccess = createAction(
  '[Booking] Save Booking TimeSlot Changed Success',
    props<{ payload: BookingDates }>()
);

export const saveBookingTimeSlotChangedFailure = createAction(
  '[Booking] Save Booking TimeSlot Changed Failure',
    props<{ payload: Error }>()
);
