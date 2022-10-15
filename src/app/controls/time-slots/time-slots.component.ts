import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { TimeSlot } from 'src/app/models/time-slot.model';
import { AppState } from 'src/app/reducers';
import * as timeSlotSelectors from '../../selectors/time-slot.selectors';
import * as timeSlotActions from '../../actions/time-slot.actions';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-time-slots',
  templateUrl: './time-slots.component.html',
  styleUrls: ['./time-slots.component.scss']
})
export class TimeSlotsComponent implements OnInit, OnDestroy {
  
  timeSlots$: Observable<TimeSlot[] | undefined>;
  loaded$: Observable<boolean>;
  loadedSubscription: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.timeSlots$ = this.store.select(timeSlotSelectors.selectTimeSlotsByDay);
    this.loaded$ = this.store.select(timeSlotSelectors.selectLoaded);
    this.loadedSubscription = this.loaded$.subscribe(loaded => {
      if (!loaded) {
        this.store.dispatch(timeSlotActions.loadTimeSlots());
      }
    });
  }

  slotSelectionChanged = (event: MatSelectionListChange) => {
    console.log(event);

    if (event.options && event.options.length > 0) {
      this.store.dispatch(timeSlotActions.timeSlotSelected({ payload: event.options[0].value }));
    }
  }

  ngOnDestroy(): void {
    this.loadedSubscription?.unsubscribe();
  }
}
