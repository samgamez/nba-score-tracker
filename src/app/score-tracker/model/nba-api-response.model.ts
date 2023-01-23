import { Game } from "./game.model";
import { Team } from "./team.model";

export interface NbaApiResponse {
	data: Team[] | Game[];
}