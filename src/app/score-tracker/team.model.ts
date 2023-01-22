import { TeamGameHistory } from "./team-game-history.model";

export interface Team {
	id: number;
	name: string;
	city: string;

	teamGameHistory: TeamGameHistory
}