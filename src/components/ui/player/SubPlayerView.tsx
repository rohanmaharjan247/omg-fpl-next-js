import { PlayerViewProps } from '@/helpers/props';
import Image from 'next/image';
const SubPlayerView = ({ managerTeam }: PlayerViewProps) => {
  const photo = managerTeam.photo.split('.');
  return (
    <div
      key={managerTeam.id}
      className="flex flex-col items-center justify-center"
    >
      <h1 className="mb-2">{managerTeam.position}</h1>
      <div className="relative w-20 h-20">
        <Image
          src={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${photo.shift()}.png`}
          alt={managerTeam.playerName ?? ''}
          fill
        />
      </div>
      <div className="flex flex-col w-28 text-center">
        <h1 className="font-bold text-sm bg-tertiary text-slate-100 text-center">
          {managerTeam.playerName}
        </h1>
        <h2 className="text-sm bg-gray-300">{managerTeam.points}</h2>
      </div>
    </div>
  );
};

export default SubPlayerView;
