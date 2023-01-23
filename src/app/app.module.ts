import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreTrackerComponent } from './score-tracker/score-tracker.component';
import { TeamsService } from './score-tracker/teams.service';
import { TeamComponent } from './score-tracker/team/team.component';
import { ResultsComponent } from './score-tracker/results/results.component';
import { StateService } from './score-tracker/state.service';

@NgModule({
  declarations: [
    AppComponent,
    ScoreTrackerComponent,
    TeamComponent,
    ResultsComponent
  ],
  imports: [
	FormsModule,
    BrowserModule,
    AppRoutingModule,
	CommonModule,
	HttpClientModule
  ],
  providers: [
	TeamsService,
	StateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
