import { Component, OnInit } from '@angular/core';
import { Team } from './model/team.model';
import { StateService } from './state.service';
import { TeamsService } from './teams.service';

@Component({
  selector: 'app-score-tracker',
  templateUrl: './score-tracker.component.html',
  styleUrls: ['./score-tracker.component.css']
})
export class ScoreTrackerComponent implements OnInit {
	teamOptions: Team[] = [];

	trackedTeams: Team[] = [];

	selectedTeam?: Team;

	constructor(private teamsService: TeamsService, private stateService: StateService<{teamOptions: Team[], trackedTeams: Team[], selectedTeam?: Team}>) { }
	ngOnInit(): void {
		const savedData = this.stateService.retrieve();
		
		if (savedData){
			this.teamOptions = savedData.teamOptions;
			this.trackedTeams = savedData.trackedTeams;
			this.selectedTeam = savedData.selectedTeam;
		}

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

			this.selectedTeam = undefined;
		}
	}

	removeTrackedTeam(team: Team){
		if (this.trackedTeams.includes(team)){
			this.trackedTeams.splice(this.trackedTeams.indexOf(team), 1);
		}
	}

	storeData(): void {
		this.stateService.store({teamOptions: this.teamOptions, trackedTeams: this.trackedTeams, selectedTeam: this.selectedTeam});
	}
}
