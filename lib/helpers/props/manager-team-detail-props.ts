import { EntryEvent, Event } from 'fpl-api';

export type ManagerTeamDetailProps = {
  currentGameweek: Event | undefined;
  managerTeam: EntryEvent | undefined;
};
