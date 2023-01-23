import { Team } from "./team.model";

export interface Game {
	home_team: Team;
	home_team_score: number;
	visitor_team: Team;
	visitor_team_score: number;
}