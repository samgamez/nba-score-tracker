import { Injectable, LOCALE_ID } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { catchError, map, Observable, of, tap } from "rxjs";
import { Team } from "./team.model";
import { formatDate } from "@angular/common";
import { TeamGameHistory } from "./team-game-history.model";
import { Game } from "./game.model";
import { TeamGame } from "./team-game.model";

@Injectable()
export class TeamsService {
	private url = 'https://free-nba.p.rapidapi.com';
	constructor(private http: HttpClient) {	}

	teams(): Observable<Team[]> {
		const options = {
			headers: this.nbaApiHeaders()
		};
		return this.http.get<{ data: Team[] }>(`${this.url}/teams`, options)
		.pipe(
			tap(response => console.log(response)),
			map(response => response.data),
			catchError(this.handleError<Team[]>('teams')));
	}

	gameHistory(teamId: number): Observable<TeamGameHistory> {
		var options = {
			headers: this.nbaApiHeaders(),
			params: this.gameHistoryParams(teamId)
		};

		return this.http.get<{ data: Game[] }>(`${this.url}/games`, options)
		.pipe(
			map(response => this.mapGameHistory(response.data, teamId)),
			catchError(this.handleError<TeamGameHistory>('gameHistory')));
	}

	private nbaApiHeaders(): HttpHeaders {
		return new HttpHeaders({ 
			'X-RapidAPI-Key':'2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
			'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
		});
	}

	private gameHistoryParams(teamId: number): HttpParams {
		let dates = [];
		let refDate = new Date(); // Reference date

		for (let i = 0; i < 12; i++) {
			let dateString = formatDate(refDate, 'yyyy-MM-dd', 'en-us');
			dates.push(dateString);

			// Subtract 1 date from the reference date
			refDate.setDate(refDate.getDate()-1);
		}
		
		return new HttpParams({ fromObject: {'dates[]': dates, 'team_ids[]': [teamId] }});
	}

	private mapGameHistory(games: Game[], teamId: number): TeamGameHistory {
		// Create games from the teams perspective
		let teamGames: TeamGame[] = games.map(g => {
			let team,
				teamScore,
				opposingTeam,
				opposingTeamScore;
			if (g.home_team.id === teamId) {
				team = g.home_team;
				teamScore = g.home_team_score;
				opposingTeam = g.visitor_team;
				opposingTeamScore = g.visitor_team_score;
			}
			else {
				team = g.visitor_team;
				teamScore = g.visitor_team_score;
				opposingTeam = g.home_team;
				opposingTeamScore = g.home_team_score;
			}

			return {
				team,
				teamScore,
				opposingTeam,
				opposingTeamScore
			};
		});

		// Calculate average score
		
		let averageScore = this.average(teamGames.map(g => g.teamScore));

		// Calculate average pointes conceded
		let averageConceded = this.average(teamGames.map(g => g.teamScore));

		return {
			games: teamGames,
			averageScore: averageScore,
			averageConceded: averageConceded
		};

	}

	private handleError<T> (operation = 'operation', result?: T) {
		// TODO: Handle the error with something like toastr
		return (error: string): Observable<T> => {
			console.error(error);
			return of(result as T);
		} 
	}

	private average(numbers: number[]): number{
		let sum = numbers.reduce((a, b) => a + b, 0);
		return sum / numbers.length;
	}
}