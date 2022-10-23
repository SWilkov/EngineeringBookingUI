import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Booking } from 'src/app/models/booking.model';
import { AppState } from 'src/app/reducers';
import * as bookingSelectors from '../../selectors/booking.selectors';
import * as bookingActions from '../../actions/booking.actions';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-booking-overview',
  templateUrl: './booking-overview.component.html',
  styleUrls: ['./booking-overview.component.scss']
})
export class BookingOverviewComponent implements OnInit, OnDestroy {
  bookings$: Observable<Booking[] | null | undefined>;
  loaded$: Observable<boolean>;
  loadedSubscription: Subscription;

  loading$: Observable<boolean>;
  mode: ProgressSpinnerMode = "indeterminate";

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.bookings$ = this.store.select(bookingSelectors.selectBookings);
    this.loaded$ = this.store.select(bookingSelectors.selectLoaded);
    this.loadedSubscription = this.loaded$.subscribe(loaded => {
      if (!loaded) {
        this.store.dispatch(bookingActions.loadBookings());
      }
    });
    this.loading$ = this.store.select(bookingSelectors.selectLoading);
  }

  ngOnDestroy(): void {
    this.loadedSubscription?.unsubscribe();
  }

}
