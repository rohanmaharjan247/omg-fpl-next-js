import { ManagerDetailProps } from '@/helpers/props';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useState } from 'react';

const ManagerDetail = ({
  manager,
  favoriteTeamCode,
  currentGameweek,
}: ManagerDetailProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div>
      <div className="relative w-64 h-64 mx-auto">
        <Image
          src={`https://resources.premierleague.com/premierleague/badges/t${favoriteTeamCode}.png`}
          alt={manager?.name ?? 'Favourite Team'}
          fill
        />
      </div>
      <div className="text-center my-4">
        <div className="flex justify-center items-center gap-2">
          <div className="cursor-pointer ml-2 text-base">
            <FontAwesomeIcon icon={faQrcode} />
          </div>

          <h1 className="header">{manager?.name}</h1>
          <div className="relative w-4 h-4">
            <Image
              src={`https://fantasy.premierleague.com/img/flags/${manager?.player_region_iso_code_short}.gif`}
              alt={manager?.player_region_iso_code_short ?? 'Flag'}
              fill
            />
          </div>
        </div>
        <h2 className="text-sm font-light">
          {manager?.player_first_name} {manager?.player_last_name}
        </h2>
      </div>
      <div className="flex justify-between gap-2">
        <div className="text-center text-sm">
          <h2 className="font-bold">Overall Points</h2>
          <h3>{manager?.summary_overall_points}</h3>
        </div>
        <div className="text-center text-sm">
          <h2 className="font-bold">{currentGameweek?.name} Points</h2>
          <h3>{manager?.summary_event_points}</h3>
        </div>
        <div className="text-center text-sm">
          <h2 className="font-bold">Overall Rank</h2>
          <h3>{manager?.summary_overall_rank}</h3>
        </div>
      </div>
    </div>
  );
};

export default ManagerDetail;
