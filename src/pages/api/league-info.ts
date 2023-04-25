import { LEAGUE_ID } from '@/helpers';
import { fetchClassicLeague } from 'fpl-api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const leagueInfo = (await fetchClassicLeague(LEAGUE_ID)).league;
  try {
    return res.status(200).json(leagueInfo);
  } catch (ex) {
    return res.status(500).json(ex);
  }
};
