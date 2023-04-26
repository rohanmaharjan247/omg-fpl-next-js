import H2HStandingTable from '@/components/ui/tables/H2HStandingTable';
import axios from 'axios';
import { H2HLeague } from 'fpl-api';
import { useEffect, useState } from 'react';

const H2HStandings = () => {
  const [h2hStandings, setH2hStandings] = useState<H2HLeague>();

  useEffect(() => {
    const fetchH2HStandings = async () => {
      const { data } = await axios.get('/api/h2h-standings');

      setH2hStandings(data);
    };
    fetchH2HStandings();
  }, []);

  return (
    <div>
      <H2HStandingTable h2hStandings={h2hStandings} />
    </div>
  );
};

export default H2HStandings;
