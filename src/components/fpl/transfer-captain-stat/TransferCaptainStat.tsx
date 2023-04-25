import { useLeagueInfo } from '@/helpers/league-info-context';
import { TransferCaptainStatProps } from '@/helpers/props';
import Image from 'next/image';

const TransferCaptainStat = ({
  title,
  image_id,
  player_name,
}: TransferCaptainStatProps) => {
  return (
    <div className="card">
      <div className="flex items-center gap-4">
        <div className="shrink-0 relative w-16 h-20">
          <Image
            src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${image_id}.png`}
            alt={player_name}
            fill
            className="rounded-full"
          />
        </div>
        <div className="grow">
          <h3 className="text-sm font-light">{title}</h3>
          <h1 className="text-xl font-bold">{player_name}</h1>
        </div>
      </div>
    </div>
  );
};

export default TransferCaptainStat;
