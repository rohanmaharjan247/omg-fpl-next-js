import { getCurrentGameweek } from '@/helpers';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const currentGameWeek = await getCurrentGameweek();

    return res.status(200).json(currentGameWeek);
  } catch (error: any) {
    return res.status(error.status).json(error);
  }
};
