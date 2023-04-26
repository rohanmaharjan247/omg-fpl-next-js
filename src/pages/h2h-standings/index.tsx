import { H2HMatches, H2HStandings } from '@/components';
import { useLeagueInfo } from '@/helpers/league-info-context';

const FPLH2HStandings = () => {
  const { currentGameweek } = useLeagueInfo();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="card col-span-2">
        <h1 className="header">Head 2 Head Standings</h1>
        <H2HStandings />
      </div>
      <div className="card">
        <h1 className="header mb-4">Head 2 Head Matches</h1>
        <h3 className="bg-gradient-to-r from-secondary to-light-primary text-slate-100 font-bold py-1 px-2 mb-4">
          {currentGameweek?.name}
        </h3>
        <H2HMatches />
      </div>
    </div>
  );
};

export default FPLH2HStandings;
