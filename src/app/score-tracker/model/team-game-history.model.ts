import { TeamGame } from "./team-game.model";


export interface TeamGameHistory {
	games: TeamGame[];
	averageScore: number;
	averageConceded: number;
}