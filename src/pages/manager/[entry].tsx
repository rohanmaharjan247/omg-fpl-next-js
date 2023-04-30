import { HeadTitle, ManagerTeamDetail } from '@/components';
import { useLeagueInfo } from '@/helpers/league-info-context';
import axios from 'axios';
import { Entry, EntryEvent } from 'fpl-api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Manager = () => {
  const router = useRouter();
  let { entry } = router.query;

  let dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });

  const { currentGameweek, generalInfo } = useLeagueInfo();
  const [manager, setManager] = useState<Entry>();
  const [managerTeam, setManagerTeam] = useState<EntryEvent>();
  const [favoriteTeamCode, setFavoriteTeamCode] = useState<number>();

  const fetchManagerTeam = async () => {
    const { data: managerTeam } = await axios.get<EntryEvent>(
      '/api/manager-team',
      {
        params: {
          managerId: entry,
          eventId: currentGameweek?.id,
        },
      }
    );

    setManagerTeam(managerTeam);
  };

  const fetchUserProfile = async () => {
    const { data: manager } = await axios.get<Entry>('/api/manager-detail', {
      params: { entry: entry },
    });

    const favoriteTeamCode = generalInfo?.teams.find(
      (x) => x.id === manager.favourite_team
    )?.code;

    setFavoriteTeamCode(favoriteTeamCode);
    setManager(manager);
  };

  useEffect(() => {
    fetchManagerTeam();
    fetchUserProfile();
  }, [currentGameweek, generalInfo]);

  return (
    <>
      <HeadTitle title={manager?.name ?? 'Manager Team'} />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <ManagerTeamDetail
            currentGameweek={currentGameweek}
            managerTeam={managerTeam}
          />
        </div>
        <div>
          <div className="card">
            <section
              className={
                'flex justify-between items-center bg-gradient-to-b from-tertiary from-10% to-transparent to-90% px-4 py-2'
              }
            >
              <div>
                <h2 className="text-sm text-slate-200">
                  {manager?.player_first_name} {manager?.player_last_name}
                </h2>
                <h1 className="header">{manager?.name}</h1>
              </div>
              <div className="relative w-8 h-8">
                <Image
                  src={`https://fantasy.premierleague.com/img/flags/${manager?.player_region_iso_code_short}.gif`}
                  alt={manager?.player_region_iso_code_short ?? 'Flag'}
                  fill
                />
              </div>
            </section>
            <section>
              <h1 className="font-bold mt-4 border-b pb-2">Points/Ranking</h1>
              <div className="flex items-center justify-between gap-4 my-2">
                <div>Overall Points</div>
                <div>{manager?.summary_overall_points}</div>
              </div>
              <div className="flex items-center justify-between gap-4 my-2">
                <div>Overall rank</div>
                <div>{manager?.summary_overall_rank?.toLocaleString()}</div>
              </div>
              <div className="flex items-center justify-between gap-4 my-2">
                <div>Joined Date</div>
                <div>
                  {manager?.joined_time &&
                    dateFormatter.format(new Date(manager?.joined_time))}
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 my-2">
                <div>Gameweek Point</div>
                <div>{manager?.summary_event_points}</div>
              </div>
            </section>
            <section>
              <h1 className="font-bold mt-4 border-b pb-2">Favourite Team</h1>
              <div className="relative w-64 h-64 mx-auto my-2">
                <Image
                  src={`https://resources.premierleague.com/premierleague/badges/t${favoriteTeamCode}.png`}
                  alt={manager?.name ?? 'Favourite Team'}
                  fill
                />
              </div>
            </section>
            <section>
              <h1 className="font-bold mt-4 border-b pb-2">Finances</h1>
              <div className="flex items-center justify-between gap-4 my-2">
                <div>Squad Value</div>
                <div>
                  £{' '}
                  {(managerTeam?.entry_history?.value ?? 0) > 100
                    ? (managerTeam?.entry_history?.value ?? 0) / 10
                    : managerTeam?.entry_history?.value}
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 my-2">
                <div>In the Bank</div>
                <div>£ {(managerTeam?.entry_history?.bank ?? 0) / 10}</div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
