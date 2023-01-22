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

	trackedTeams: Team[] = [];

	selectedTeamId?: Team;

	constructor(private teamsService: TeamsService) { }
	ngOnInit(): void {
		this.teamsService.teams()
		.subscribe(result => {
			this.teamOptions = result;

			console.log(this.teamOptions);
		});
	}

	trackTeam(team?: Team): void {
		if (team && !this.trackedTeams.includes(team)) {
			this.trackedTeams.push(team);

			console.log(team);

			// get team game data
			this.teamsService.gameHistory(team.id)
			.subscribe(response => {
				team.gameHistory = response;
			});

			this.selectedTeamId = undefined;
		}
	}

	removeTrackedTeam(team: Team){
		if (this.trackedTeams.includes(team)){
			this.trackedTeams.splice(this.trackedTeams.indexOf(team), 1);
		}
	}
}
