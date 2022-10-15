
import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import * as fromTimeSlot from '../reducers/time-slot.reducer';
import * as fromBooking from '../reducers/booking.reducer';
import { TimeSlot } from '../models/time-slot.model';
import { getNumberOfCurrencyDigits } from '@angular/common';

const getTimeSlotState = (state: AppState) => state.timeSlots;
const getBookingState = (state: AppState) => state.bookings;

export const selectLoading = createSelector(
  getTimeSlotState,
  (state) => fromTimeSlot.getLoading(state)
);

export const selectLoaded = createSelector(
  getTimeSlotState,
  (state) => fromTimeSlot.getLoaded(state)
);

export const selectTimeSlots = createSelector(
  getTimeSlotState,
  (state) => fromTimeSlot.all(state)
);

export const selectError = createSelector(
  getTimeSlotState,
  (state) => fromTimeSlot.getError(state)
);

export const selectTimeSlotsByDay = createSelector(
  getTimeSlotState,
  getBookingState,

  (state, bookingState) => {
    const selectedDate = fromBooking.getSelectedDate(bookingState);
    const day = selectedDate.getDay();

    //Sunday is index 0 in javascript, but 7 in the database
    return fromTimeSlot.getTimeSlotsByDay(state, day === 0 ? 7 : day);
  });
  
export const timeSlotBooked = (props: {current: TimeSlot}) => createSelector(
  getTimeSlotState,
  getBookingState,

  (state, bookingState) => {
    const bookedDates = fromBooking.getBookingsBySelectedDate(bookingState);
    const selectedDate = fromBooking.getSelectedDate(bookingState);

    if (bookedDates && bookedDates.length > 0) {
       let result =
        bookedDates.find(x => {
          let startTime = `${String(new Date(x.startDate).getHours()).padStart(2, '0')}:${String(new Date(x.startDate).getMinutes()).padStart(2, '0')}:${String(new Date(x.startDate).getSeconds()).padStart(2, '0')}`;
          
          let endTime = `${String(new Date(x.endDate).getHours()).padStart(2, '0')}:${String(new Date(x.endDate).getMinutes()).padStart(2, '0')}:${String(new Date(x.endDate).getSeconds()).padStart(2, '0')}`;
          return startTime === props.current.startTime.toString() && endTime === props.current.endTime.toString();
        });

        return result && result.id > 0 ? true : false;
    }

    return false;
  });

  export const selectedSelectedTimeSlot = createSelector(
    getTimeSlotState,
    (state) => fromTimeSlot.getSelected(state)
  );