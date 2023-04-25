import { getInFormPlayers, getPLTeams } from '@/helpers';
import { InFormPlayers } from '@/helpers/models/in-form-players';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let formPlayers = await getInFormPlayers();
    const teams = await getPLTeams();

    let inFormPlayers = formPlayers.map((player) => {
      const team = teams.find((x) => x.id === player.team);

      const p: InFormPlayers = {
        id: player.id,
        form: Number(player.form),
        first_name: player.first_name,
        second_name: player.second_name,
        photo: player.photo,
        team_name: team?.name ?? '',
        team_short_name: team?.short_name ?? '',
        web_name: player.web_name,
      };
      return p;
    });

    return res.status(200).json(inFormPlayers);
  } catch (error: any) {
    return res.status(error.status).json(error);
  }
};
