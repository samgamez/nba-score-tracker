import { Team } from "./team.model";

export interface ScoreTrackerState {
	teamOptions: Team[];
	trackedTeams: Team[]; 
	selectedTeam?: Team;
}