import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Team } from '../model/team.model';

@Component({
  selector: 'nst-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
	@Input() team: Team = {
		id: 0,
		name: '',
		city: '',
		abbreviation: '',
		conference: ''
	};

	@Output() remove: EventEmitter<Team> = new EventEmitter<Team>();
	@Output() resultsClick: EventEmitter<void> = new EventEmitter<void>();

	onRemove(): void {
		this.remove.emit(this.team);
	}

	onResultsClick(): void {
		this.resultsClick.emit();
	}
}
