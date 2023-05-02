import { H2HStandingsProps } from '@/helpers/props';
import styles from './styles/LeagueStandingTable.module.css';
import Link from 'next/link';
const H2HStandingTable = ({ h2hStandings }: H2HStandingsProps) => {
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
          <th scope="col">W</th>
          <th scope="col">D</th>
          <th scope="col">L</th>
          <th scope="col">Score</th>
          <th scope="col">Pts.</th>
        </tr>
      </thead>
      <tbody>
        {h2hStandings?.standings?.results?.map((h2h) => (
          <tr key={h2h.id}>
            <td className="text-center">{h2h.rank}</td>
            <td>
              <h2 className="font-bold">
                <Link
                  href={`/manager/${h2h.entry}`}
                  className="hover:text-light-primary transition-colors"
                >
                  {h2h.entry_name}
                </Link>
              </h2>
              <h3 className="font-light text-sm">{h2h.player_name}</h3>
            </td>
            <td className="font-light text-center">{h2h.matches_won}</td>
            <td className="font-light text-center">{h2h.matches_drawn}</td>
            <td className="font-light text-center">{h2h.matches_lost}</td>
            <td className="font-light text-center">{h2h.points_for}</td>
            <td className="font-light text-center">{h2h.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default H2HStandingTable;
