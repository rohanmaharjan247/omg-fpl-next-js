import { PlayerViewProps } from '@/helpers/props';
import Image from 'next/image';

const PlayerView = ({ managerTeam }: PlayerViewProps) => {
  const photo = managerTeam.photo.split('.');
  return (
    <div
      key={managerTeam.id}
      className="flex flex-col items-center justify-center"
    >
      <div className="relative w-20 h-20">
        <Image
          src={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${photo.shift()}.png`}
          alt={managerTeam.playerName ?? ''}
          fill
        />
      </div>
      <div className="flex flex-col w-28">
        <h1 className="text-sm font-bold bg-tertiary text-slate-100 text-center">
          {managerTeam.playerName}
        </h1>
        <h2 className="text-sm bg-gray-300  text-center">
          {managerTeam.points}
        </h2>
      </div>
    </div>
  );
};

export default PlayerView;
