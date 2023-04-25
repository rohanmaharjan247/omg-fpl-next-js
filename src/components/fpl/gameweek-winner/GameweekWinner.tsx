import { useLeagueInfo } from '@/helpers/league-info-context';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { ClassicLeagueEntry } from 'fpl-api';
import { useEffect, useState } from 'react';

const GameweekWinner = () => {
  const [gameweekWinner, setGameweekWinner] = useState<ClassicLeagueEntry>();
  const { currentGameweek } = useLeagueInfo();
  useEffect(() => {
    const fetchGameweekWinner = async () => {
      const { data } = await axios.get<ClassicLeagueEntry>(
        '/api/current-gameweek-winner'
      );

      setGameweekWinner(data);
    };
    fetchGameweekWinner();
  }, []);

  return (
    <div className="card relative">
      <h3 className="text-sm font-bold">{currentGameweek?.name} Winner</h3>
      <h1 className="text-2xl font-bold">{gameweekWinner?.entry_name}</h1>
      <h3 className="text-sm font-light capitalize">
        {gameweekWinner?.player_name}
      </h3>
      <div className="absolute -top-2 -left-3">
        <FontAwesomeIcon
          icon={faCrown}
          className="text-2xl text-yellow-400 -rotate-45"
        />
      </div>
      <div className="absolute -top-2 -right-3 bg-secondary text-slate-100 px-3 py-3 rounded-full font-bold">
        {gameweekWinner?.event_total}
        <div className="font-light text-xs">pts.</div>
      </div>
    </div>
  );
};

export default GameweekWinner;
