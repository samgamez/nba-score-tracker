import { Component, OnInit } from '@angular/core';
import { HttpResult } from './model/http-result.model';
import { ScoreTrackerState } from './model/score-tracker-state.model';
import { TeamGameHistory } from './model/team-game-history.model';
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

	errorMessages: string[] = [];

	constructor(private teamsService: TeamsService, private stateService: StateService<ScoreTrackerState>) { }
	ngOnInit(): void {
		// Check for saved state of component
		const savedData: ScoreTrackerState | undefined = this.stateService.retrieve();

		if (savedData){
			this.teamOptions = savedData.teamOptions;
			this.trackedTeams = savedData.trackedTeams;
			this.selectedTeam = savedData.selectedTeam;
		}

		// Load team options
		this.teamsService.teams()
		.subscribe((result: HttpResult<Team[]>) => {
			if (result.errorMessage){
				this.errorMessages.push(result.errorMessage);
			}
			else if (result.data) {
				this.teamOptions = result.data || [];
			}
		});
	}

	trackTeam(team?: Team): void {
		if (team && !this.trackedTeams.includes(team)) {
			this.trackedTeams.push(team);

			// get team game data
			this.teamsService.gameHistory(team.id)
			.subscribe((result: HttpResult<TeamGameHistory>) => {
				if (result.errorMessage) {
					this.errorMessages.push(result.errorMessage);
				}
				else if (result.data){
					team.gameHistory = result.data || [];
				}
			});

			this.selectedTeam = undefined;
		}
	}

	removeTrackedTeam(team: Team): void{
		if (this.trackedTeams.includes(team)){
			// Remove team from tracked teams
			this.trackedTeams.splice(this.trackedTeams.indexOf(team), 1);
		}
	}

	storeData(): void {
		const stateObj: ScoreTrackerState = {teamOptions: this.teamOptions, trackedTeams: this.trackedTeams, selectedTeam: this.selectedTeam};
		// Save component state
		this.stateService.store(stateObj);
	}
}
