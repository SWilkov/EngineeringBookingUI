import { Component, Input, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/booking.model';

@Component({
  selector: 'app-booking-item',
  templateUrl: './booking-item.component.html',
  styleUrls: ['./booking-item.component.scss']
})
export class BookingItemComponent implements OnInit {
  
  //#region Private fields and accessors
  private _booking: Booking | undefined;
  @Input() public set booking(value: Booking | undefined) {
   this._booking = value;
  }
  public get booking(): Booking | undefined {
    return this._booking;
  }
  //#endregion

  constructor() { }

  ngOnInit(): void {
  }

}
