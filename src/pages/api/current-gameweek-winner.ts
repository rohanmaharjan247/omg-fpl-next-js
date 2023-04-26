import { getClassicLeagueStandings } from '@/helpers';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const [leagueStandings] = (await getClassicLeagueStandings(1)).sort(
      (a, b) => b.event_total - a.event_total
    );

    return res.status(200).json(leagueStandings);
  } catch (error: any) {
    return res.status(error.status).json(error);
  }
};
