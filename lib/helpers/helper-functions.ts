import {
  ClassicLeagueEntry,
  fetchBootstrap,
  fetchClassicLeague,
  fetchEntryHistory,
} from 'fpl-api';
import { LEAGUE_ID } from './constants';

async function playerData(
  entryId: number,
  classicLeagueEntry: ClassicLeagueEntry
) {
  const entryHistory = await fetchEntryHistory(entryId);
  const currentEntry = entryHistory.current;

  const [currentGameweek] = currentEntry.sort((a, b) => b.event - a.event);
  classicLeagueEntry.event_total =
    classicLeagueEntry.event_total - currentGameweek.event_transfers_cost;

  return classicLeagueEntry;
}

export async function getClassicLeagueStandings(phase: number) {
  const classicLeague = await fetchClassicLeague(LEAGUE_ID, {
    pageNewEntries: 1,
    pageStandings: 1,
    phase: phase,
  });
  const leagueStandings = classicLeague.standings.results.map(
    async (m) => await playerData(m.entry, m)
  );

  return Promise.all(leagueStandings);
}

export async function getCurrentGameweek() {
  const gameWeek = (await fetchBootstrap()).events.find((x) => x.is_current);

  return gameWeek;
}

export async function getInFormPlayers() {
  let inFormPlayers = (await fetchBootstrap()).elements;
  inFormPlayers.sort((a, b) => Number(b.form) - Number(a.form));
  inFormPlayers = inFormPlayers.splice(0, 10);
  return Promise.all(inFormPlayers);
}
export async function getPLTeams() {
  let teams = (await fetchBootstrap()).teams;
  return Promise.all(teams);
}
