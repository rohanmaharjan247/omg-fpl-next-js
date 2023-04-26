import { getClassicLeagueStandings } from '@/helpers';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { phase } = req.query;
    return res.status(200).json(await getClassicLeagueStandings(Number(phase)));
  } catch (error: any) {
    return res.status(error.status).json(error);
  }
};
