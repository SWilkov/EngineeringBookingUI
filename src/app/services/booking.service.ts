import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HTTP_OPTIONS } from '../misc/http-helpers';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  all = (): Observable<Booking[]> => {
    let url: string = environment.bookingApi;

    return this.http.get<Booking[]>(url, HTTP_OPTIONS)
      .pipe();
  }

  save = (booking: Booking): Observable<Booking> => {
    let url: string = environment.bookingApi;

    return this.http.post<Booking>(url, booking, HTTP_OPTIONS)
      .pipe();
  }
}
