import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreTrackerComponent } from './score-tracker/score-tracker.component';
import { TeamsService } from './score-tracker/teams.service';

@NgModule({
  declarations: [
    AppComponent,
    ScoreTrackerComponent
  ],
  imports: [
	FormsModule,
    BrowserModule,
    AppRoutingModule,
	CommonModule,
	HttpClientModule
  ],
  providers: [
	TeamsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
