import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
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
	
	constructor(private route: ActivatedRoute, private teamsService: TeamsService) { }
	ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			let teamIdString: string | null = params.get('teamCode');

			if (teamIdString){
				const teamId: number = Number(teamIdString);
				forkJoin([this.teamsService.team(teamId), this.teamsService.gameHistory(teamId)])
				.subscribe((results: [Team, TeamGameHistory]) => {
					this.team = results[0];
					this.team.gameHistory = results[1];
				});
			}
		});
	}
}
