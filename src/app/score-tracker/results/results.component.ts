import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { HttpResult } from '../model/http-result.model';
import { TeamGameHistory } from '../model/team-game-history.model';
import { Team } from '../model/team.model';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'nst-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
	team?: Team = {
		id: 0,
		name: '',
		city: '',
		abbreviation: '',
		conference: ''
	};

	errorMessages: string[] = [];
	constructor(private route: ActivatedRoute, private teamsService: TeamsService) { }
	ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			let teamIdString: string | null = params.get('teamCode');

			if (teamIdString){
				const teamId: number = Number(teamIdString);

				// Look up team and gamehistory at the same time
				forkJoin([this.teamsService.team(teamId), this.teamsService.gameHistory(teamId)])
				.subscribe((results: [HttpResult<Team>, HttpResult<TeamGameHistory>]) => {
					// Check for error messages and set the team data if there are no errors
					if (results[0].errorMessage){
						this.errorMessages.push(results[0].errorMessage);
					}
					else {
						this.team = results[0].data;
					}

					// Check for error messages and set game history data if there are no errors
					if (results[1].errorMessage) {
						this.errorMessages.push(results[1].errorMessage);
					}
					else if (this.team) {
						this.team.gameHistory = results[1].data;
					}
				});
			}
		});
	}
}
