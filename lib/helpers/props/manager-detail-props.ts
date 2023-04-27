import { Entry, Event } from 'fpl-api';

export type ManagerDetailProps = {
  manager: Entry;
  favoriteTeamCode: number | undefined;
  currentGameweek: Event | undefined;
};
