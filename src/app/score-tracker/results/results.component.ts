import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'nst-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
	constructor(private route: ActivatedRoute, private teamsService: TeamsService) { }
	ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			let teamId = params.get('teamCode');
			console.log(teamId);
			// this.teamsService.team
		});
	}
}
