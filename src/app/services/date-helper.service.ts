import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { BookingDates } from '../models/booking-dates.model';
import { TimeSlot } from '../models/time-slot.model';

@Injectable({
  providedIn: 'root'
})
export class DateHelperService {

  constructor() { }

  addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  format = (date: Date, timeSlot: TimeSlot): Observable<BookingDates> => {
    if (date && timeSlot) {
      let start: Date = timeSlot.startTime ?
        new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${timeSlot.startTime}`) : new Date();
      let end: Date = timeSlot.endTime ?
        new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${timeSlot.endTime}`) : new Date();

      return of({
        startDate: start,
        endDate: end
      });
    }
    return of({
      startDate: new Date(),
      endDate: new Date()
    });
  }
}
