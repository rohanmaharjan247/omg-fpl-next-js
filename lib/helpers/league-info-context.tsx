import axios from 'axios';
import { Bootstrap, ClassicLeagueInfo, Event } from 'fpl-api';
import { createContext, useContext, useState } from 'react';

interface LeagueInfo {
  leagueInfo: ClassicLeagueInfo | undefined;
  currentGameweek: Event | undefined;
  generalInfo: Bootstrap | undefined;
}

export const LeagueInfoContext = createContext<LeagueInfo>({
  leagueInfo: undefined,
  currentGameweek: undefined,
  generalInfo: undefined,
});

export const useLeagueInfo = () => useContext(LeagueInfoContext);
