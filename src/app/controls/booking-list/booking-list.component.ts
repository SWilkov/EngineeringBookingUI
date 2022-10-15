import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Booking } from 'src/app/models/booking.model';
import { AppState } from 'src/app/reducers';
import * as bookingSelectors from '../../selectors/booking.selectors';
import * as bookingActions from '../../actions/booking.actions';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit, OnDestroy {

  @Input() bookings: Booking[] | null | undefined = [];
  
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
   
  }
 
  ngOnDestroy(): void { 
  }
}
