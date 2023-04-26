import { H2H_LEAGUE_ID } from '@/helpers';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function h2hMatches(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let searchParams = new URLSearchParams();
    const entryId = req.query.entryId
      ? req.query.entryId.toString()
      : undefined;
    const event = req.query.event ? req.query.event.toString() : undefined;
    if (entryId) searchParams.set('entry', entryId);
    if (event) searchParams.set('event', event);
    const { data: h2hMatches } = await axios.get(
      `https://fantasy.premierleague.com/api/leagues-h2h-matches/league/${H2H_LEAGUE_ID}`,
      { params: searchParams }
    );

    // await (
    //   await fetch(
    //     `https://fantasy.premierleague.com/api/leagues-h2h-matches/league/${H2H_LEAGUE_ID}/?${searchParams}`
    //   )
    // ).json();
    return res.status(200).json(h2hMatches);
  } catch (error: any) {
    return res.status(500).json(error);
  }
}
