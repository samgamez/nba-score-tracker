import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, Observable, of, tap } from "rxjs";
import { Team } from "./team.model";

@Injectable()
export class TeamsService {
	constructor(private http: HttpClient) {	}

	teams(): Observable<Team[]> {
		const options = {
			headers: this.nbaApiHeaders()
		};
		return this.http.get<{ data: Team[] }>('https://free-nba.p.rapidapi.com/teams', options)
		.pipe(
			tap(response => console.log(response)),
			map(response => response.data),
			catchError(this.handleError<Team[]>('teams')))
	}

	private nbaApiHeaders(): HttpHeaders {
		return new HttpHeaders({ 
			'X-RapidAPI-Key':'2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
			'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
		});
	}

	private handleError<T> (operation = 'operation', result?: T) {
		// TODO: Handle the error with something like toastr
		return (error: string): Observable<T> => {
			console.error(error);
			return of(result as T);
		} 
	}
}