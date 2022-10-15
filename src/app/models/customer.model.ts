import { Address } from "./address.model";

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  address: Address;
}