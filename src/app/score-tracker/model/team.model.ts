import { TeamGameHistory } from "../team-game-history.model";

export interface Team {
	id: number;
	name: string;
	city: string;
	abbreviation: string;
	conference: string;


	gameHistory?: TeamGameHistory
}