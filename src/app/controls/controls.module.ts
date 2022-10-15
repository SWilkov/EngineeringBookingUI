import { NgModule } from "@angular/core";
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingItemComponent } from './booking-item/booking-item.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { SaveBookingComponent } from './save-booking/save-booking.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialLibraryModule } from "../modules/material-library.module";
import { TimeSlotsComponent } from './time-slots/time-slots.component';
import { TimeSlotItemComponent } from './time-slot-item/time-slot-item.component';

@NgModule({
  declarations: [ 
    BookingListComponent,
    BookingItemComponent,
    HeaderComponent,
    FooterComponent,
    SaveBookingComponent,
    TimeSlotsComponent,
    TimeSlotItemComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialLibraryModule
  ],
  exports: [
    BookingListComponent,
    BookingItemComponent,
    HeaderComponent,
    FooterComponent,
    TimeSlotItemComponent,
    TimeSlotsComponent
  ]
})
export class ControlsModule { }