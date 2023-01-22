import { Team } from "./team.model";

export interface TeamGame {
	team: Team;
	teamScore: number;
	opposingTeam: Team;
	opposingTeamScore: number;
}