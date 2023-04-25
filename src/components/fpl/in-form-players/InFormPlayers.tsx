import { InFormPlayers } from '@/helpers/models/in-form-players';
import axios from 'axios';
import { Element } from 'fpl-api';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const InFormPlayers = () => {
  const [inFormPlayers, setInFormPlayers] = useState<InFormPlayers[]>([]);

  useEffect(() => {
    const fetchInFormPlayers = async () => {
      const { data } = await axios.get<InFormPlayers[]>('/api/in-form-players');

      setInFormPlayers(data);
    };
    fetchInFormPlayers();
  }, []);

  return (
    <div>
      <h3 className="font-bold">Player Form</h3>
      {inFormPlayers.map((player) => (
        <div
          className="flex gap-4 justify-between items-center py-2"
          key={player.id}
        >
          <div className="relative shrink-0 w-8 h-10">
            <Image
              src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.photo
                .split('.')
                .shift()}.png`}
              alt={player.web_name}
              fill
              className="rounded-full"
            />
          </div>
          <div className="px-2 grow">
            <h1 className="">{player.web_name}</h1>
            <h2 className="text-sm font-light">{player.team_name}</h2>
          </div>
          <div className="shrink-0 text-sm text-center bg-secondary text-slate-100 w-9 py-1 rounded-lg">
            {player.form}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InFormPlayers;
