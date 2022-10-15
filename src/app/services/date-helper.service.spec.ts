import { TestBed } from '@angular/core/testing';
import { TimeSlot } from '../models/time-slot.model';

import { DateHelperService } from './date-helper.service';

describe('DateHelperService', () => {
  let service: DateHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addDays adds 2 days to date', () => {
    const date = new Date();
    const result = service.addDays(date, 2);
    expect(result.getDate()).toBe(date.getDate() + 2);
  });

  it('addDays adds 5 days to date', () => {
    const date = new Date();
    const result = service.addDays(date, 5);
    expect(result.getDate()).toBe(date.getDate() + 5);
  });
  
});
