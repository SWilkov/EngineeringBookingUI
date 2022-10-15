import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HTTP_OPTIONS } from '../misc/http-helpers';
import { TimeSlot } from '../models/time-slot.model';

@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {

  constructor(private http: HttpClient) { }

  all = (): Observable<TimeSlot[]> => {
    let url: string = environment.timeSlotApi;

    return this.http.get<TimeSlot[]>(url, HTTP_OPTIONS)
      .pipe();
  }  
}
