import { HeadTitle, ManagerDetail, ProfileForm } from '@/components';
import { useLeagueInfo } from '@/helpers/league-info-context';
import { UserProfile } from '@/helpers/models';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import axios from 'axios';
import { Entry, EntryEvent } from 'fpl-api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
    // if (!user) return [];

    console.log('🚀 --> getUserData --> user:', user);
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
  const fetchUserProfile = async () => {
    if (profile) {
      const { data: manager } = await axios.get<Entry>('/api/manager-detail', {
        params: { entry: profile.entry_code },
      });

      const favoriteTeamCode = generalInfo?.teams.find(
        (x) => x.id === manager.favourite_team
      )?.code;
      setFavoriteTeamCode(favoriteTeamCode);
      console.log(manager);
      setManager(manager);
    }
  };
  const fetchUserTeam = async () => {
    if (profile) {
      const { data: managerTeam } = await axios.get<EntryEvent>(
        '/api/manager-team',
        {
          params: {
            managerId: profile.entry_code,
            eventId: currentGameweek?.id,
          },
        }
      );
      console.log(managerTeam);
      setManagerTeam(managerTeam);
    }
  };

  useEffect(() => {
    getUserData();
    fetchUserProfile();
    fetchUserTeam();
  }, [user]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  if (!user) {
    return;
  }

  return (
    <>
      <HeadTitle title={userData?.name} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="card">
          <h1 className="header">{userData?.name}</h1>
          <h3 className="font-light">{userData?.email}</h3>
          <div className="h-1 bg-gray-400 w-full my-4 rounded"></div>
          <div>
            {/* {manager ?  : <ProfileForm user={user} />} */}
            {manager ? (
              <ManagerDetail
                currentGameweek={currentGameweek}
                favoriteTeamCode={favoriteTeamCode}
                manager={manager}
              />
            ) : (
              <ProfileForm user={user} />
            )}
          </div>
        </div>
        <div className="col-span-2">
          <div className="card">Team and all</div>
        </div>
      </div>
    </>
  );
};

export default Profile;
