import { useLeagueInfo } from '@/helpers/league-info-context';
import {
  faArrowUp19,
  faArrowUpWideShort,
  faCrown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames';
import { ClassicLeagueEntry } from 'fpl-api';
import Link from 'next/link';
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
      <h3 className="text-sm font-bold">
        {currentGameweek?.name}{' '}
        {currentGameweek?.finished ? 'Winner' : 'In Progress'}
      </h3>
      <h1 className="header">
        <Link
          href={`/manager/${gameweekWinner?.entry}`}
          className="hover:text-light-primary transition-colors"
        >
          {gameweekWinner?.entry_name}
        </Link>
      </h1>
      <h3 className="text-sm font-light capitalize">
        {gameweekWinner?.player_name}
      </h3>

      <div
        className={classNames(
          'absolute -top-2',
          currentGameweek?.finished ? '-left-3' : '-left-2'
        )}
      >
        <FontAwesomeIcon
          icon={currentGameweek?.finished ? faCrown : faArrowUpWideShort}
          className={classNames(
            currentGameweek?.finished
              ? `text-2xl text-yellow-400 -rotate-45`
              : 'text-xl bg-light-secondary text-slate-100 rounded p-1'
          )}
        />
      </div>
      <div className="absolute -top-2 -right-3 bg-secondary text-slate-100 px-3 py-3 rounded-full font-bold text-center">
        {gameweekWinner?.event_total}
        <div className="font-light text-xs">pts.</div>
      </div>
    </div>
  );
};

export default GameweekWinner;
