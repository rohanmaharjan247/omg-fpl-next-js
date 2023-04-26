import H2HMatchesGrid from '@/components/ui/grids/H2HMatchesGrid';
import { useLeagueInfo } from '@/helpers/league-info-context';
import axios from 'axios';
import { H2HMatch } from 'fpl-api';
import { useEffect, useState } from 'react';

const H2HMatches = () => {
  const [h2hMatches, setH2HMatches] = useState<H2HMatch[]>([]);
  const { currentGameweek } = useLeagueInfo();
  useEffect(() => {
    const fetchH2HMatches = async () => {
      const { data } = await axios.get('/api/h2h-matches', {
        params: { event: currentGameweek?.id },
      });

      setH2HMatches(data.results);
    };
    fetchH2HMatches();
  }, [currentGameweek]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {h2hMatches.map((h2h) => (
        <H2HMatchesGrid key={h2h.id} h2hMatches={h2h} />
      ))}
    </div>
  );
};

export default H2HMatches;
