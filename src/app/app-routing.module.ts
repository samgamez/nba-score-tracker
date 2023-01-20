import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoreTrackerComponent } from './score-tracker/score-tracker.component';

const routes: Routes = [
	{ path: '', component: ScoreTrackerComponent },
	{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
