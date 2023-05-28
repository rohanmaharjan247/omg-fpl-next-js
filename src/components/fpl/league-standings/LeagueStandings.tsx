import LeagueStandingTable from '@/components/ui/tables/LeagueStandingTable';
import { useLeagueInfo } from '@/helpers/league-info-context';
import axios from 'axios';
import { ClassicLeagueEntry } from 'fpl-api';
import { useEffect, useState } from 'react';

const LeagueStandings = () => {
  const [leagueStanding, setLeagueStanding] = useState<ClassicLeagueEntry[]>(
    []
  );
  const { leagueInfo, currentGameweek } = useLeagueInfo();

  useEffect(() => {
    const fetchLeagueStandings = async () => {
      const { data } = await axios.get<ClassicLeagueEntry[]>(
        '/api/league-standings',
        { params: { phase: 1 } }
      );

      setLeagueStanding(data);
    };
    fetchLeagueStandings();
  }, []);

  return (
    <div className="card">
      <h1 className="text-2xl font-bold">{currentGameweek?.name} Standings</h1>
      <LeagueStandingTable leagueStandings={leagueStanding} />
    </div>
  );
};

export default LeagueStandings;
