import {
  CurrentGameweek,
  GameweekWinner,
  HeadTitle,
  InFormPlayers,
  LeagueStandings,
  TransferCaptainStat,
} from '@/components';
import { useLeagueInfo } from '@/helpers/league-info-context';

import Image from 'next/image';

export default function Home() {
  const { generalInfo, currentGameweek } = useLeagueInfo();

  const mostTransferredPlayer = generalInfo?.elements?.find(
    (x) => x.id === currentGameweek?.most_transferred_in
  );
  const mostTranferredPlayerPhoto = mostTransferredPlayer?.photo.split('.')[0];
  const mostCaptainedPlayer = generalInfo?.elements?.find(
    (x) => x.id === currentGameweek?.most_captained
  );
  const mostCaptainedPlayerPhoto = mostCaptainedPlayer?.photo.split('.')[0];
  return (
    <>
      <HeadTitle title="Home" />
      <div className="my-4">
        <CurrentGameweek />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="col-span-3">
            <LeagueStandings />
          </div>
          <div>
            <GameweekWinner />
            {mostTransferredPlayer && mostTranferredPlayerPhoto && (
              <TransferCaptainStat
                title="Most Transferred Player"
                player_name={`${mostTransferredPlayer.first_name} ${mostTransferredPlayer.second_name}`}
                image_id={mostTranferredPlayerPhoto}
              />
            )}
            {mostCaptainedPlayer && mostCaptainedPlayerPhoto && (
              <TransferCaptainStat
                title="Most Captained Player"
                player_name={`${mostCaptainedPlayer.first_name} ${mostCaptainedPlayer.second_name}`}
                image_id={mostCaptainedPlayerPhoto}
              />
            )}
            <div className="card">
              <InFormPlayers />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
