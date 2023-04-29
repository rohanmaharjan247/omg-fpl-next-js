import { Entry } from 'fpl-api';

export type ManagerDetailProps = {
  manager: Entry;
  favoriteTeamCode: number | undefined;
  qr_code_url: string | undefined;
};
