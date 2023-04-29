import CurrentGameweekCard from '@/components/ui/cards/CurrentGameweekCard';
import { useLeagueInfo } from '@/helpers/league-info-context';
import {
  faClipboard,
  faGauge,
  faHashtag,
  faRightLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Event } from 'fpl-api';
import { useEffect, useState } from 'react';

const CurrentGameweek = () => {
  const { currentGameweek } = useLeagueInfo();
  const [wildCardPlayed, setWildCardPlayed] = useState<number>(0);

  useEffect(() => {
    const totalWildcardPlayed =
      currentGameweek?.chip_plays?.find((x) => x.chip_name === 'wildcard')
        ?.num_played ?? 0;
    setWildCardPlayed(totalWildcardPlayed);
  }, [currentGameweek]);

  return (
    <div>
      <h1 className="header">{currentGameweek?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CurrentGameweekCard
          title="Highest Score"
          stats={currentGameweek?.highest_score?.toLocaleString() ?? ''}
          icon={faHashtag}
          bgColor="bg-primary"
        />
        <CurrentGameweekCard
          title="Average Score"
          stats={currentGameweek?.average_entry_score?.toLocaleString() ?? ''}
          icon={faGauge}
          bgColor="bg-secondary"
        />
        <CurrentGameweekCard
          title="Transfer Made"
          stats={currentGameweek?.transfers_made?.toLocaleString() ?? ''}
          icon={faRightLeft}
          bgColor="bg-tertiary"
        />
        <CurrentGameweekCard
          title="Wildcards Played"
          stats={wildCardPlayed.toLocaleString()}
          icon={faClipboard}
          bgColor="bg-light-primary"
        />
      </div>
    </div>
  );
};

export default CurrentGameweek;
