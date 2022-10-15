import { Customer } from "./customer.model";
import { TimeSlot } from "./time-slot.model";

export interface Booking {
  id: number;
  startDate: Date;
  endDate: Date;
  vehicleRegistration: string;
  jobCategory: string;
  comments: string;
  customer: Customer;  
}