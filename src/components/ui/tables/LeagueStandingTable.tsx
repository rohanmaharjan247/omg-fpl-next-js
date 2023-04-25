import { LeagueStandingProps } from '@/helpers/props';
import styles from './styles/LeagueStandingTable.module.css';
import { ClassicLeagueEntry } from 'fpl-api';

const LeagueStandingTable = ({ leagueStandings }: LeagueStandingProps) => {
  return (
    <table className={`table-auto w-full my-2 ${styles.league_table}`}>
      <thead className="bg-gradient-to-r from-secondary to-tertiary text-slate-100">
        <tr className="uppercase text-sm">
          <th scope="col" className="w-4">
            Rank
          </th>
          <th scope="col" className="text-left">
            Team & Manager
          </th>
          <th scope="col">GW</th>
          <th scope="col">Pts</th>
        </tr>
      </thead>
      <tbody>
        {leagueStandings.map((leagueStanding: ClassicLeagueEntry) => (
          <tr className="border-b" key={leagueStanding.id}>
            <td className="text-center">{leagueStanding.rank}</td>
            <td>
              <h2 className="font-bold">{leagueStanding.entry_name}</h2>
              <p className="font-light text-sm">{leagueStanding.player_name}</p>
            </td>
            <td className="text-center font-light">
              {leagueStanding.event_total}
            </td>
            <td className="text-center font-light">{leagueStanding.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeagueStandingTable;
