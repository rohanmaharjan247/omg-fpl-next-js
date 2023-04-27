import { fetchEntryEvent } from 'fpl-api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { managerId, eventId } = req.query;
    const manager_id = managerId ? Number(managerId) : 0;
    const event_id = managerId ? Number(eventId) : 0;
    const manager = await fetchEntryEvent(manager_id, event_id);
    return res.status(200).json(manager);
  } catch (error: any) {
    return res.status(500).json(error);
  }
};
