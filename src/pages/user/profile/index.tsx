import {
  HeadTitle,
  ManagerDetail,
  ManagerTeamDetail,
  ProfileForm,
} from '@/components';
import { useLeagueInfo } from '@/helpers/league-info-context';
import { UserProfile } from '@/helpers/models';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import axios from 'axios';
import { Entry, EntryEvent } from 'fpl-api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Profile = () => {
  const user = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const userData = user?.user_metadata;

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { currentGameweek, generalInfo } = useLeagueInfo();
  const [manager, setManager] = useState<Entry>();
  const [managerTeam, setManagerTeam] = useState<EntryEvent>();
  const [favoriteTeamCode, setFavoriteTeamCode] = useState<number>();

  const getUserData = async () => {
    const { data, error } = await supabaseClient
      .from('user_profile')
      .select<'*', UserProfile>()
      .eq('user_id', user?.id)
      .single();
    if (error) {
      console.error(error);
      return;
    }

    setProfile(data);
  };
  const fetchUserProfile = async (profile: UserProfile) => {
    const { data: manager } = await axios.get<Entry>('/api/manager-detail', {
      params: { entry: profile.entry_code },
    });

    const favoriteTeamCode = generalInfo?.teams.find(
      (x) => x.id === manager.favourite_team
    )?.code;

    setFavoriteTeamCode(favoriteTeamCode);
    setManager(manager);
  };
  const fetchUserTeam = async (profile: UserProfile) => {
    const { data: managerTeam } = await axios.get<EntryEvent>(
      '/api/manager-team',
      {
        params: {
          managerId: profile.entry_code,
          eventId: currentGameweek?.id,
        },
      }
    );

    setManagerTeam(managerTeam);
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
    if (profile) {
      fetchUserProfile(profile);
      fetchUserTeam(profile);
    }
  }, [user, profile]);

  if (!user) {
    return;
  }

  return (
    <>
      <HeadTitle title={userData?.name} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="">
          <div className="card">
            <h1 className="header">{userData?.name}</h1>
            <h3 className="font-light">{userData?.email}</h3>
            <div className="h-1 bg-gray-400 w-full my-4 rounded"></div>
            <div>
              {/* {manager ?  : <ProfileForm user={user} />} */}
              {manager ? (
                <ManagerDetail
                  favoriteTeamCode={favoriteTeamCode}
                  manager={manager}
                  qr_code_url={profile?.qr_code_url}
                />
              ) : (
                <ProfileForm user={user} />
              )}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <ManagerTeamDetail
            currentGameweek={currentGameweek}
            managerTeam={managerTeam}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
