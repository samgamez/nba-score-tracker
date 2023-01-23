import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from "@angular/common/http";
import { catchError, map, Observable, of, tap } from "rxjs";
import { Team } from "./model/team.model";
import { formatDate } from "@angular/common";
import { TeamGameHistory } from "./model/team-game-history.model";
import { Game } from "./model/game.model";
import { TeamGame } from "./model/team-game.model";
import { NbaApiRequest } from "./model/nba-api-request.model";
import { NbaApiResponse } from "./model/nba-api-response.model";

@Injectable()
export class TeamsService {
	private url = 'https://free-nba.p.rapidapi.com';
	constructor(private http: HttpClient) {	}

	teams(): Observable<Team[]> {
		const options: NbaApiRequest = { headers: this.nbaApiHeaders() };
		return this.http.get<NbaApiResponse>(`${this.url}/teams`, options)
		.pipe(
			map((response: NbaApiResponse) => response.data as Team[]),
			catchError(this.handleError<Team[]>('An error occurred while loading teams')));
	}

	team(teamId: number): Observable<Team> {
		const options: NbaApiRequest = { headers: this.nbaApiHeaders() };
		return this.http.get<Team>(`${this.url}/teams/${teamId}`, options)
		.pipe(
			catchError(this.handleError<Team>('An error occurred while looking up team')));
	}

	gameHistory(teamId: number): Observable<TeamGameHistory> {
		const options: NbaApiRequest = { headers: this.nbaApiHeaders(), params: this.gameHistoryParams(teamId) };
		return this.http.get<NbaApiResponse>(`${this.url}/games`, options)
		.pipe(
			map((response: NbaApiResponse) => this.mapGameHistory((response.data as Game[]), teamId)),
			catchError(this.handleError<TeamGameHistory>('An error occurred while getting team\'s game history for the past 12 days')));
	}

	private nbaApiHeaders(): HttpHeaders {
		// Return api headders used by free NBA API
		return new HttpHeaders({ 
			'X-RapidAPI-Key':'2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
			'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
		});
	}

	private gameHistoryParams(teamId: number): HttpParams {
		let dateStrings: string[] = [];
		let refDate: Date = new Date(); // Reference date

		for (let i = 0; i < 12; i++) {
			// Subtract 1 date from the reference date
			refDate.setDate(refDate.getDate()-1);
			
			let dateString: string = formatDate(refDate, 'yyyy-MM-dd', 'en-us');
			dateStrings.push(dateString);
		}
		
		const paramOptions: HttpParamsOptions = { fromObject: {'dates[]': dateStrings, 'team_ids[]': [teamId] }};
		return new HttpParams(paramOptions);
	}

	private mapGameHistory(games: Game[], teamId: number): TeamGameHistory {
		// Create games from the teams perspective
		let teamGames: TeamGame[] = games.map(g => {
			let team: Team,
				teamScore: number,
				opposingTeam: Team,
				opposingTeamScore: number;
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

			const teamGame: TeamGame = {
				team,
				teamScore,
				opposingTeam,
				opposingTeamScore
			};

			return teamGame;
		});

		// Calculate average score
		let averageScore: number = this.average(teamGames.map(g => g.teamScore));

		// Calculate average pointes conceded
		let averageConceded: number = this.average(teamGames.map(g => g.teamScore));

		const result: TeamGameHistory = {
			games: teamGames,
			averageScore: averageScore,
			averageConceded: averageConceded
		};

		return result;

	}

	private handleError<T> (message: string): { (error: string): Observable<T> } {
		// Log error in the console and return an observable
		return (error: string): Observable<T> => {
			console.error(message, error);
			return of({} as T);
		} 
	}

	private average(numbers: number[]): number{
		// Get the averagge by adding the values of the number list together and then dividing the sum by the length of the list
		let sum: number = numbers.reduce((a, b) => a + b, 0);
		return sum / numbers.length;
	}
}