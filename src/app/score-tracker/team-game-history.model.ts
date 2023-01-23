import { TeamGame } from "./model/team-game.model";


export interface TeamGameHistory {
	games: TeamGame[];
	averageScore: number;
	averageConceded: number;
}