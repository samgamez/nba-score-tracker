import { Component, OnInit } from '@angular/core';
import { Team } from './team.model';
import { TeamsService } from './teams.service';

@Component({
  selector: 'app-score-tracker',
  templateUrl: './score-tracker.component.html',
  styleUrls: ['./score-tracker.component.css']
})
export class ScoreTrackerComponent implements OnInit {
	teamOptions: Team[] = [];

	constructor(private teamsService: TeamsService) { }
	ngOnInit(): void {
		this.teamsService.teams()
		.subscribe(result => {
			this.teamOptions = result;
		});
	}

	
}
