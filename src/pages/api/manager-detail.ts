import { fetchEntry } from 'fpl-api';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function playerEntry(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const entry = Number(req.query.entry);
    const playerDetail = await fetchEntry(entry);
    return res.status(200).json(playerDetail);
  } catch (error: any) {
    return res.status(500).json(error);
  }
}
