import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaveBookingComponent } from './controls/save-booking/save-booking.component';
import { BookingOverviewComponent } from './pages/booking-overview/booking-overview.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bookings',
    pathMatch: 'full'
  },
  {
    path: 'bookings',
    component: BookingOverviewComponent
  },
  {
    path: 'save-booking',
    component: SaveBookingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
