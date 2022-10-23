import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import { Booking } from "../models/booking.model";
import * as bookingActions from '../actions/booking.actions';
import { BookingDates } from "../models/booking-dates.model";

export interface BookingState extends EntityState<Booking> {
  loading: boolean;
  loaded: boolean;
  saving: boolean;  
  saved: boolean;
  error: Error;
  selectedDate: Date;

  bookingDates: BookingDates;
}

export const adaptor: EntityAdapter<Booking> = createEntityAdapter<Booking>({});

export const initialBookingState: BookingState = adaptor.getInitialState({
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  error: {} as Error,
  selectedDate: new Date(),

  bookingDates: {
    startDate: new Date(),
    endDate: new Date()
  }
}); 

const _bookingreducer = createReducer(
  initialBookingState,

  on(bookingActions.loadBookings,
    (state) => ({
      ...state,
      loading: true,
    }),
  ),
  on(bookingActions.loadBookingsSuccess,
    (state, { payload }) => {
      if (payload) {
      return adaptor.setAll(payload, {
        ...state,
        loading: false,
        loaded: true
      })
    } else {
      return {
        ...state,
        loading: false,
        loaded: true
      }
    }
    }),
  on(bookingActions.loadBookingsFailure,
    (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload
    })),
  on(bookingActions.saveBooking,
    (state, { payload }) => ({
      ...state,
      saving: true,
      saved: false
    })),
  on(bookingActions.saveBookingSuccess,
    (state, { payload }) => {
      return adaptor.addOne(payload, {
        ...state,
        saving: false,
        saved: true
      })
    }),
  on(bookingActions.saveBookingFailure,
    (state, { payload }) => ({
      ...state,
      saving: false,
      error: payload
    })),
  on(bookingActions.updateSelectedDate,
    (state, { payload }) => ({
      ...state,
      selectedDate: payload
    })),
  on(bookingActions.saveBookingTimeSlotChanged,
    (state, {date, timeSlot}) => ({
      ...state      
    })),
  on(bookingActions.saveBookingTimeSlotChangedSuccess,
    (state, { payload }) => ({
      ...state,
      bookingDates: payload
    })),
  on(bookingActions.saveBookingTimeSlotChangedFailure,
    (state, { payload }) => ({
      ...state,
      error: payload
    })),
);

export function bookingReducer(state: BookingState | undefined, action: Action) {
  return _bookingreducer(state, action);
}

/// ngrx entity helpers
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adaptor.getSelectors();

export const getLoading = (state: BookingState) => state.loading;
export const getLoaded = (state: BookingState) => state.loaded;
export const getSaving = (state: BookingState) => state.saving;
export const getSaved = (state: BookingState) => state.saved;
export const getError = (state: BookingState) => state.error;

export const all = (state: BookingState) => selectAll(state);
export const getSelectedDate = (state: BookingState) => state.selectedDate;

export const getBookingsBySelectedDate = (state: BookingState) => {
  if (state && state.entities) {
    let bookings = selectAll(state)
      .filter(booking => new Date(booking.startDate).getFullYear() === state.selectedDate.getFullYear() &&
       new Date(booking.startDate).getMonth() === state.selectedDate.getMonth() &&
       new Date(booking.startDate).getDate() === state.selectedDate.getDate());
    //console.log(`heres the bookings: ${bookings.map(x => x.startDate)}`);
    return bookings;
    } 
  return [];
};

export const getBookingDates = (state: BookingState) => state.bookingDates;
    