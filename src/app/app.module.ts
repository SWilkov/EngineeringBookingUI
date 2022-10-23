import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MaterialLibraryModule } from './modules/material-library.module';
import { BookingService } from './services/booking.service';
import { reducers } from './reducers';
import { ControlsModule } from './controls/controls.module';
import { EffectsModule } from '@ngrx/effects';
import { BookingEffects } from './effects/booking.effects';
import { BookingOverviewComponent } from './pages/booking-overview/booking-overview.component';
import { TimeSlotEffects } from './effects/time-slot.effects';
import { TimeSlotService } from './services/time-slot.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { DateHelperService } from './services/date-helper.service';
import { SnackBarService } from './services/snack-bar.service';

@NgModule({
  declarations: [
    AppComponent,
    BookingOverviewComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,    
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialLibraryModule,
    ControlsModule,

    StoreModule.forRoot(reducers, {

    }),
    EffectsModule.forRoot([
      BookingEffects,
      TimeSlotEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    BrowserAnimationsModule
  ],
  providers: [
    BookingService,
    TimeSlotService,
    DateHelperService,
    SnackBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
