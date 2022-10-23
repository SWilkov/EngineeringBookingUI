import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BookingDates } from 'src/app/models/booking-dates.model';
import { Booking } from 'src/app/models/booking.model';
import { TimeSlot } from 'src/app/models/time-slot.model';
import { AppState } from 'src/app/reducers';
import { DateHelperService } from 'src/app/services/date-helper.service';
import * as bookingActions from '../../actions/booking.actions';
import * as bookingSelectors from '../../selectors/booking.selectors';
import * as timeSlotSelectors from '../../selectors/time-slot.selectors'; 
@Component({
  selector: 'app-save-booking',
  templateUrl: './save-booking.component.html',
  styleUrls: ['./save-booking.component.scss']
})
export class SaveBookingComponent implements OnInit, OnDestroy {
  jobCategories: string[] = [
    'Warranty',
    'Breakdown',
    'Vehicle off Road'
  ];
  
  minDate: Date = new Date();

  bookingForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contactNumber: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    postcode: ['', [Validators.required, Validators.maxLength(8)]],
    date: [new Date(), Validators.required],
    vehicleRegistration: ['', [Validators.required, Validators.maxLength(8)]],
    jobCategory: ['', Validators.required],
    comments: ['', Validators.maxLength(500)]   
  });

  bookings$: Observable<Booking[] | null | undefined>;
  loaded$: Observable<boolean>;
  loadedSubscription: Subscription;

  selectedTimeSlot$: Observable<TimeSlot>;
  selectedTimeSlotSubscription: Subscription;

  bookingDates$: Observable<BookingDates>;
  bookingDatesSubscription: Subscription;
  bookingDates: BookingDates = {
    startDate: new Date(),
    endDate: new Date()
  };

  constructor(private store: Store<AppState>,
    private fb: FormBuilder,
    private dateHelperService: DateHelperService) { }

  ngOnInit(): void {    
    this.bookings$ = this.store.select(bookingSelectors.selectBookings);
    this.loaded$ = this.store.select(bookingSelectors.selectLoaded);
    this.loadedSubscription = this.loaded$.subscribe(loaded => {
      if (!loaded) {
        this.store.dispatch(bookingActions.loadBookings());
      }
    });

    this.selectedTimeSlot$ = this.store.select(timeSlotSelectors.selectedSelectedTimeSlot);
    this.selectedTimeSlotSubscription = this.selectedTimeSlot$.subscribe(timeSlot => {
      if (timeSlot) {
        let date = this.bookingForm.controls.date.value;
        if (date) {
          this.store.dispatch(bookingActions.saveBookingTimeSlotChanged({ date: date, timeSlot: timeSlot }));
        }       
      }
    });

    this.bookingDates$ = this.store.select(bookingSelectors.selectBookingDates);
    this.bookingDatesSubscription = this.bookingDates$.subscribe(bookingDates => {
      if (bookingDates) {
        this.bookingDates = bookingDates;
      }
    });    

    this.minDate = this.dateHelperService.addDays(new Date(), 2);

    //dummy data for testing
    this.dummyData();
  }

  dummyData = () => {
    this.bookingForm.patchValue({
      firstName: 'John',
      lastName: 'Smith',
      email: 'jsmith@gmail.com',
      contactNumber: '01234567890',
      street: '123 Fake Street',
      city: 'London',
      postcode: 'SW1A 1AA',
      date: new Date(),
      vehicleRegistration: 'AB12 CDE',
      jobCategory: 'Warranty',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel aliquam lacinia, nisl nisl aliquet nisl, eget aliquam nisl nunc vel nisl. Donec euismod, nunc vel aliquam lacinia, nisl nisl aliquet nisl, eget aliquam nisl nunc vel nisl. Donec euismod, nunc vel aliquam lacinia, nisl nisl aliquet nisl, eget aliquam nisl nunc vel nisl. Donec euismod, nunc vel aliquam lacinia, nisl nisl aliquet nisl, eget aliquam nisl nunc vel nisl.'
    });
  }

  reset = () => {
    this.bookingForm.reset();
  }

  /// Date has changed from the form let the store know
  dateChanged = (event: MatDatepickerInputEvent<Date>) => {    
    if (event.value) {
      this.store.dispatch(bookingActions.updateSelectedDate({ payload: event.value }));
    }
  }

  save = () => {   

    //Check form is valid and save to Api
    if (this.bookingForm.valid) {
      let booking: Booking = {
        id: 0,
        customer: {
          id: 0,
          firstName: this.bookingForm.controls.firstName?.value ?? '',
          lastName: this.bookingForm.controls.lastName?.value ?? '',
          email: this.bookingForm.controls.email?.value ?? '',
          contactNumber: this.bookingForm.controls.contactNumber?.value ?? '',
          address: {
            street: this.bookingForm.controls.street?.value ?? '',
            city: this.bookingForm.controls.city?.value ?? '',
            postcode: this.bookingForm.controls.postcode?.value ?? ''
            }
          },
          startDate: this.bookingDates.startDate,
          endDate: this.bookingDates.endDate,
          vehicleRegistration: this.bookingForm.controls.vehicleRegistration?.value ?? '',
          jobCategory: this.bookingForm.controls.jobCategory?.value ?? '',
          comments: this.bookingForm.controls.comments?.value ?? ''
       };

       console.log(booking);
       
       this.store.dispatch(bookingActions.saveBooking({payload: booking}));
    }
  }

  ngOnDestroy(): void {
    this.loadedSubscription?.unsubscribe();
    this.selectedTimeSlotSubscription?.unsubscribe();
    this.bookingDatesSubscription?.unsubscribe();
  }
}
