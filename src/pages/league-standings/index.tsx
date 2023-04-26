import { HeadTitle, LeagueStandings } from '@/components';
import LeagueStandingTable from '@/components/ui/tables/LeagueStandingTable';
import { useLeagueInfo } from '@/helpers/league-info-context';
import axios from 'axios';
import { ClassicLeagueEntry } from 'fpl-api';
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';

const FPLStandings = () => {
  const { leagueInfo, generalInfo, currentGameweek } = useLeagueInfo();
  const [leagueStanding, setLeagueStanding] = useState<ClassicLeagueEntry[]>(
    []
  );
  const [selectedPhase, setSelectedPhase] = useState<number>(1);
  useEffect(() => {
    const fetchLeagueStandings = async () => {
      const { data } = await axios.get<ClassicLeagueEntry[]>(
        '/api/league-standings',
        { params: { phase: selectedPhase } }
      );

      setLeagueStanding(data);
    };
    fetchLeagueStandings();
  }, [selectedPhase]);

  const handleOnChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedPhase(Number(value));
  };

  return (
    <>
      <HeadTitle title="League Standings" />
      <div className="card">
        <h1 className="header">{leagueInfo?.name} Standings</h1>
        <div className="flex items-center my-4">
          <label
            htmlFor="small"
            className="block mb-2 mr-3 text-sm font-medium text-gray-900"
          >
            Select Month
          </label>
          <select
            id="small"
            className="block w-40 p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            onChange={handleOnChange}
          >
            {generalInfo?.phases
              ?.filter((f) => f.start_event <= (currentGameweek?.id ?? 0))
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
          </select>
        </div>
        <LeagueStandingTable leagueStandings={leagueStanding} />
      </div>
    </>
  );
};

export default FPLStandings;
