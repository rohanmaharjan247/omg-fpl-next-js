import { fetchBootstrap } from 'fpl-api';
import { NextApiRequest, NextApiResponse } from 'next';
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).json(await fetchBootstrap());
  } catch (error: any) {
    return res.status(error.status).json(error);
  }
};
