import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DayOfWeek } from 'src/app/models/day.enum';
import { TimeSlot } from 'src/app/models/time-slot.model';
import { AppState } from 'src/app/reducers';
import * as timeSlotSelectors from '../../selectors/time-slot.selectors';
import * as bookingSelectors from '../../selectors/booking.selectors';

@Component({
  selector: 'app-time-slot-item',
  templateUrl: './time-slot-item.component.html',
  styleUrls: ['./time-slot-item.component.scss']
})
export class TimeSlotItemComponent implements OnInit, OnDestroy {

  @Input() timeSlot: TimeSlot;
  @Input() booked: boolean = false;
  day: DayOfWeek = DayOfWeek.Monday;

  booked$: Observable<boolean>;
  bookedSubscription: Subscription;
  selectedDate$: Observable<Date>;
  selectedDateSubscription: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.day = this.timeSlot.dayOfWeek;
    this.selectedDate$ = this.store.select(bookingSelectors.selectSelectedDate);
    this.selectedDateSubscription = this.selectedDate$.subscribe(date => {
      if (date) {
        this.booked$ = this.store.select(timeSlotSelectors.timeSlotBooked({current: this.timeSlot }));
      }}); 
      
    this.booked$ = this.store.select(timeSlotSelectors.timeSlotBooked({current: this.timeSlot }));
    this.bookedSubscription = this.booked$.subscribe(booked => {
      this.booked = booked;
    });
  }

  ngOnDestroy(): void {
    this.selectedDateSubscription?.unsubscribe();
    this.bookedSubscription?.unsubscribe();
  }
}
