import { H2H_LEAGUE_ID } from '@/helpers';
import { fetchH2HLeagueStandings } from 'fpl-api';
import { NextApiRequest, NextApiResponse } from 'next';
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const h2hStandings = await fetchH2HLeagueStandings(H2H_LEAGUE_ID);

    return res.status(200).json(h2hStandings);
  } catch (error: any) {
    return res.status(error.status).json(error);
  }
};
