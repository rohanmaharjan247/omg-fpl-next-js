export interface ManagerTeam {
  id?: number;
  playerName?: string;
  teamName?: string;
  points?: number;
  minutesPlayed?: number;
  goalScored?: number;
  goalConceded?: number;
  yellowCards?: number;
  redCards?: number;
  bonus?: number;
  position: string;
  multipler?: number;
  is_captain?: boolean;
  is_vice_captain?: boolean;
  in_team: 'regular' | 'substitute';
  photo: string;
}
